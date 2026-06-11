import { useCallback, useEffect, useRef, useState } from "react";
import { HiMiniChatBubbleLeftRight } from "react-icons/hi2";
import { FaXmark } from "react-icons/fa6";
import { useLocation } from "react-router-dom";

type TawkApi = {
  customStyle?: {
    zIndex?: number | string;
  };
  onLoad?: () => void;
  onChatMaximized?: () => void;
  onChatMinimized?: () => void;
  onChatHidden?: () => void;
  showWidget?: () => void;
  hideWidget?: () => void;
  maximize?: () => void;
  minimize?: () => void;
  isChatMaximized?: () => boolean;
  addEvent?: (
    eventName: string,
    metadata?: Record<string, string>,
    callback?: (error?: unknown) => void,
  ) => void;
  setAttributes?: (
    attributes: Record<string, string>,
    callback?: (error?: unknown) => void,
  ) => void;
};

declare global {
  interface Window {
    Tawk_API?: TawkApi;
    Tawk_LoadStart?: Date;
  }
}

const tawkEmbedUrl = import.meta.env.VITE_TAWK_EMBED_URL;
const tawkLoadDelayMs = Number(import.meta.env.VITE_TAWK_DELAY_MS || 2500);

const TawkChatWidget = () => {
  const location = useLocation();
  const [isWidgetReady, setIsWidgetReady] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isTeaserVisible, setIsTeaserVisible] = useState(false);
  const hasInjectedScriptRef = useRef(false);
  const shouldOpenOnReadyRef = useRef(false);
  const isTeaserDismissedRef = useRef(false);
  const lastTrackedPathRef = useRef("");

  const openChat = () => {
    setIsTeaserVisible(false);

    if (!tawkEmbedUrl) {
      return;
    }

    if (!hasInjectedScriptRef.current) {
      shouldOpenOnReadyRef.current = true;
      injectScript();
      return;
    }

    if (!isWidgetReady) {
      shouldOpenOnReadyRef.current = true;
      return;
    }

    window.Tawk_API?.showWidget?.();
    window.Tawk_API?.maximize?.();
    setIsChatOpen(true);
  };

  const hideWidgetChrome = useCallback(() => {
    window.Tawk_API?.hideWidget?.();
    setIsChatOpen(false);

    if (!isTeaserDismissedRef.current) {
      setIsTeaserVisible(true);
    }
  }, []);

  const injectScript = useCallback(() => {
    if (hasInjectedScriptRef.current) {
      return;
    }

    hasInjectedScriptRef.current = true;

    window.Tawk_API = window.Tawk_API || {};
    window.Tawk_API.customStyle = {
      zIndex: 55,
    };
    window.Tawk_API.onLoad = () => {
      setIsWidgetReady(true);
      hideWidgetChrome();

      if (shouldOpenOnReadyRef.current) {
        shouldOpenOnReadyRef.current = false;
        window.Tawk_API?.showWidget?.();
        window.Tawk_API?.maximize?.();
        setIsChatOpen(true);
      }
    };
    window.Tawk_API.onChatMaximized = () => {
      setIsChatOpen(true);
      setIsTeaserVisible(false);
    };
    window.Tawk_API.onChatMinimized = () => {
      hideWidgetChrome();
    };
    window.Tawk_API.onChatHidden = () => {
      hideWidgetChrome();
    };
    window.Tawk_LoadStart = new Date();

    const script = document.createElement("script");
    script.async = true;
    script.src = tawkEmbedUrl;
    script.charset = "UTF-8";
    script.setAttribute("crossorigin", "*");
    script.dataset.tawk = "cogitation-works";
    document.body.appendChild(script);
  }, [hideWidgetChrome]);

  useEffect(() => {
    const loadTimer = window.setTimeout(() => {
      injectScript();
    }, tawkLoadDelayMs);

    const teaserTimer = window.setTimeout(() => {
      setIsTeaserVisible(true);
    }, 1200);

    return () => {
      window.clearTimeout(loadTimer);
      window.clearTimeout(teaserTimer);
    };
  }, [injectScript]);

  useEffect(() => {
    if (!isWidgetReady || !window.Tawk_API) {
      return;
    }

    const pagePath = `${location.pathname}${location.search}`;

    if (lastTrackedPathRef.current === pagePath) {
      return;
    }

    lastTrackedPathRef.current = pagePath;

    const pageTitle = document.title || "Cogitation Works";
    const pageUrl = window.location.href;

    window.Tawk_API.setAttributes?.(
      {
        currentPage: pagePath,
        pageTitle,
      },
      () => {},
    );

    window.Tawk_API.addEvent?.(
      "page-navigation",
      {
        page: pagePath,
        title: pageTitle,
        url: pageUrl,
      },
      () => {},
    );
  }, [isWidgetReady, location.pathname, location.search]);

  if (!tawkEmbedUrl) {
    return null;
  }

  return (
    <div className="pointer-events-none fixed bottom-6 right-6 z-[60] flex max-w-[calc(100vw-3rem)] flex-col items-end gap-3 md:bottom-7 md:right-7">
      {isTeaserVisible && !isChatOpen ? (
        <div className="pointer-events-auto w-[min(270px,calc(100vw-3rem))] md:w-[min(292px,calc(100vw-3rem))] overflow-hidden rounded-[22px] border border-slate-200/80 bg-white/95 p-3.5 md:p-4 shadow-[0_24px_60px_rgba(15,23,42,0.18)] backdrop-blur-md">
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="text-[10px] md:text-[11px] font-semibold uppercase tracking-[0.18em] md:tracking-[0.2em] text-blue-500">
                Cogitation Works
              </p>
              <h3 className="mt-1.5 md:mt-2 text-[15px] leading-6 md:text-[19px] md:leading-7 font-extrabold text-slate-900">
                Hi there, need help building?
              </h3>
            </div>
            <button
              type="button"
              aria-label="Close chat prompt"
              className="pointer-events-auto rounded-full p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700"
              onClick={() => {
                isTeaserDismissedRef.current = true;
                setIsTeaserVisible(false);
              }}
            >
              <FaXmark />
            </button>
          </div>
        </div>
      ) : null}

      <button
        type="button"
        aria-label="Open live chat"
        onClick={openChat}
        className="button-glow pointer-events-auto flex h-[52px] w-[52px] items-center justify-center rounded-full bg-[#3B82F6] text-white shadow-[0_20px_45px_rgba(59,130,246,0.35)] md:h-14 md:w-14"
      >
        <HiMiniChatBubbleLeftRight className="text-2xl md:text-[26px]" />
      </button>
    </div>
  );
};

export default TawkChatWidget;
