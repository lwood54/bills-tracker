import React, { useState } from "react";
// @ts-ignore
import { hydrateRoot } from "react-dom/client";
import { CacheProvider } from "@emotion/react";
import { RemixBrowser } from "@remix-run/react";

import { ClientStyleContext } from "./context";
import createEmotionCache from "./createEmotionCache";

interface ClientCacheProviderProps {
  children: React.ReactNode;
}

function ClientCacheProvider({ children }: ClientCacheProviderProps) {
  const [cache, setCache] = useState(createEmotionCache());

  function reset() {
    setCache(createEmotionCache());
  }

  return (
    <ClientStyleContext.Provider value={{ reset }}>
      <CacheProvider value={cache}>{children}</CacheProvider>
    </ClientStyleContext.Provider>
  );
}

// console.log({ ENV: process.env.NODE_ENV });
// if (process.env.NODE_ENV === "test") {
//   require("react-dom").hydrate(
//     <ClientCacheProvider>
//       <RemixBrowser />
//     </ClientCacheProvider>,
//     document
//   );
// } else {
//   hydrateRoot(
//     document,
//     <ClientCacheProvider>
//       <RemixBrowser />
//     </ClientCacheProvider>
//   );
// }

hydrateRoot(
  document,
  <ClientCacheProvider>
    <RemixBrowser />
  </ClientCacheProvider>
);
