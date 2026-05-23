import { useCallback, useEffect, useRef, useState } from "react";
import { HiMiniChatBubbleLeftRight } from "react-icons/hi2";
import { FaXmark } from "react-icons/fa6";

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
};

declare global {
  interface Window {
    Tawk_API?: TawkApi;
    Tawk_LoadStart?: Date;
  }
}

const consultationUrl =
  import.meta.env.VITE_CONSULTATION_URL ||
  "https://calendar.app.google/7gB3fnhRjGCBUptQ6";
const tawkEmbedUrl = import.meta.env.VITE_TAWK_EMBED_URL;
const tawkLoadDelayMs = Number(import.meta.env.VITE_TAWK_DELAY_MS || 2500);

const TawkChatWidget = () => {
  const [isWidgetReady, setIsWidgetReady] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isTeaserVisible, setIsTeaserVisible] = useState(false);
  const hasInjectedScriptRef = useRef(false);
  const shouldOpenOnReadyRef = useRef(false);
  const isTeaserDismissedRef = useRef(false);

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

  if (!tawkEmbedUrl) {
    return null;
  }

  return (
    <div className="pointer-events-none fixed bottom-4 right-4 z-[60] flex max-w-[calc(100vw-2rem)] flex-col items-end gap-3 md:bottom-6 md:right-6">
      {isTeaserVisible && !isChatOpen ? (
        <div className="pointer-events-auto w-[min(300px,calc(100vw-2rem))] overflow-hidden rounded-[24px] border border-slate-200/80 bg-white/95 p-4 shadow-[0_24px_60px_rgba(15,23,42,0.18)] backdrop-blur-md">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-blue-500">
                Cogitation Works
              </p>
              <h3 className="mt-2 text-lg font-extrabold text-slate-900">
                Hi there, need help building?
              </h3>
            </div>
            <button
              type="button"
              aria-label="Close chat prompt"
              className="pointer-events-auto rounded-full p-2 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700"
              onClick={() => {
                isTeaserDismissedRef.current = true;
                setIsTeaserVisible(false);
              }}
            >
              <FaXmark />
            </button>
          </div>

          <p className="mt-3 text-sm leading-6 text-slate-600">
            We build apps, websites, hosting and domain setups, and turn ideas
            into working digital products.
          </p>

          <div className="mt-3 flex flex-wrap gap-2 text-xs font-semibold text-slate-600">
            {[
              "App Development",
              "Website Development",
              "Hosting",
              "Domains",
            ].map((item) => (
              <span
                key={item}
                className="rounded-full bg-blue-50 px-3 py-1 text-blue-600"
              >
                {item}
              </span>
            ))}
          </div>

          <div className="mt-4 grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={openChat}
              className="button-glow pointer-events-auto inline-flex min-h-11 items-center justify-center rounded-full bg-[#3B82F6] px-4 py-2.5 text-sm font-semibold text-white"
            >
              Chat Now
            </button>
            <a
              href={consultationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="button-outline-motion pointer-events-auto inline-flex min-h-11 items-center justify-center rounded-full border border-[#3B82F6]/25 bg-white px-4 py-2.5 text-center text-sm font-semibold text-[#3B82F6]"
            >
              Book Consultation
            </a>
          </div>

          <a
            href={consultationUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 block text-center text-xs font-semibold text-slate-500 transition-colors hover:text-[#3B82F6]"
          >
            Schedule a call with our team
          </a>
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
