'use client';

import { useState } from "react";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import { AuthProvider } from "./context/AuthContext";
import Nav from "./components/Nav";
import { CartProvider } from "react-use-cart";
import Notifications from "./components/Notifications";
import Providers from "./providers";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from 'react-redux';
import musicStore from './amplitude/redux/store';
import store from './videos/store/store'; // ✅ Video.js Redux store
import { MusicProvider } from "./context/MusicContext";
import useBodyClass from './hooks/useBodyClass'
import ModalManager from "./components/modalManager";      // ✅ New: Modal system wrapper
import SiteFooter from "./components/siteFooter";          // ✅ New: Footer with modal tabs
import GlobalLoader from './loading/components/GlobalLoader';
import 'animate.css';
import SearchSite from './components/SearchSite'

export default function RootLayout({ children }) {
  useBodyClass()
  const [queryClient] = useState(() => new QueryClient());

  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body>
        <SessionProvider>
          <AuthProvider>
            {/* <MusicProvider> */}
            <CartProvider>
              <Nav />
              <QueryClientProvider client={queryClient}>
                <Providers>
                  <Provider store={musicStore}>
                    <ModalManager> {/* ✅ Wrap everything to enable global modals */}
                           <GlobalLoader />
                           <SearchSite />
                      {children}
                      <SiteFooter /> {/* ✅ Footer visible on all pages */}
                    </ModalManager>
                  </Provider>
                </Providers>
              </QueryClientProvider>
              <Notifications />
            </CartProvider>
            {/* </MusicProvider> */}
          </AuthProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
