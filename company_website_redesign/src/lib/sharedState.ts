"use client";

import { useSyncExternalStore } from "react";

/**
 * State that is shared by EVERY render of a component on the page — including
 * the magnifier's duplicate.
 *
 * ──────────────────────────────────────────────────────────────────────────
 * ⚠️ WHY THIS EXISTS, and when to reach for it.
 *
 * `magnifier-lens.tsx` renders the whole page a second time so it can scale
 * that copy. That means every component under it is MOUNTED TWICE, and two
 * mounts of the same component each get their own `useState`. The copy's
 * state never changes — nothing can hover or click it, it is
 * `pointer-events: none` — so it stays on whatever the initial value was.
 *
 * The visible result: you expand a row, magnify it, and the magnifier shows
 * the collapsed version. You hover the fifth service, magnify it, and the
 * magnifier shows the first one still open. It looks like the lens is showing
 * the wrong part of the page, which is how it was reported.
 *
 * THE RULE: if a piece of state changes what is PAINTED, it cannot live in
 * `useState`. Put it here, keyed by a name unique to that component, and both
 * mounts will read the same value.
 *
 * Purely internal state that does not change the visual result — a ref to a
 * DOM node, a cached measurement — is fine in `useState`.
 * ──────────────────────────────────────────────────────────────────────────
 */

type Store = { v: unknown; subs: Set<() => void> };

const stores = new Map<string, Store>();

function storeFor(key: string, initial: unknown): Store {
  let s = stores.get(key);
  if (!s) {
    s = { v: initial, subs: new Set() };
    stores.set(key, s);
  }
  return s;
}

export function useSharedState<T>(
  key: string,
  initial: T,
): [T, (next: T) => void] {
  const store = storeFor(key, initial);

  const value = useSyncExternalStore(
    (onChange) => {
      store.subs.add(onChange);
      return () => {
        store.subs.delete(onChange);
      };
    },
    () => store.v as T,
    // Server render: the initial value, so hydration matches.
    () => store.v as T,
  );

  const set = (next: T) => {
    if (Object.is(next, store.v)) return;
    store.v = next;
    store.subs.forEach((fn) => fn());
  };

  return [value, set];
}
