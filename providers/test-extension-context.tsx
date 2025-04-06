"use client";

import {
  connectInjectedExtension,
  InjectedExtension,
} from "polkadot-api/pjs-signer";
import { createContext, useContext } from "react";
import { useSyncExternalStore } from "react";

const TestExtensionContext = createContext<InjectedExtension[]>([]);

function getExtensionsStore(): {
  subscribe: (callback: () => void) => () => void;
  getSnapshot: () => Map<string, InjectedExtension>;
  getServerSnapshot: () => Map<string, InjectedExtension>;
  onToggleExtension: (name: string) => Promise<void>;
} {
  let connectedExtensions = new Map<string, InjectedExtension>();
  const getSnapshot = () => connectedExtensions;

  const listeners = new Set<() => void>();
  const update = () => {
    connectedExtensions = new Map(connectedExtensions);
    listeners.forEach((cb) => cb());
  };
  const subscribe = (cb: () => void) => {
    listeners.add(cb);
    return () => {
      listeners.delete(cb);
    };
  };

  const onToggleExtension = async (name: string) => {
    if (connectedExtensions.has(name)) {
      connectedExtensions.delete(name);
      return update();
    }

    const extension = await connectInjectedExtension(name);
    connectedExtensions.set(name, extension);
    update();
  };

  return {
    subscribe,
    getSnapshot,
    getServerSnapshot: () => connectedExtensions,
    onToggleExtension,
  };
}

export function TestExtensionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const extensionsStore = getExtensionsStore();
  const selectedExtensions = useSyncExternalStore(
    extensionsStore.subscribe,
    extensionsStore.getSnapshot,
    extensionsStore.getServerSnapshot
  );

  return (
    <TestExtensionContext.Provider value={[...selectedExtensions.values()]}>
      {children}
    </TestExtensionContext.Provider>
  );
}

export function useTestExtension() {
  const context = useContext(TestExtensionContext);
  if (!context)
    throw new Error(
      "useTestExtension must be used within TestExtensionProvider"
    );
  return context;
}
