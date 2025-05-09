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
import store from './videos/store/store';
import { MusicProvider } from "./context/MusicContext";
import useBodyClass from './hooks/useBodyClass';
import ModalManager from "./components/modalManager";
import SiteFooter from "./components/siteFooter";
import GlobalLoader from './loading/components/GlobalLoader';
import 'animate.css';
import SearchSite from './components/SearchSite';
import { FoodOrderProvider } from "./context/FoodOrderContext";

// ✅ ADD: Global media modal support
import { MediaManagerProvider } from './media/MediaManager/MediaManagerProvider';
import { MediaManagerModal } from './media/MediaManager/MediaManagerModal';

export default function RootLayout({ children }) {
  useBodyClass();
  const [queryClient] = useState(() => new QueryClient());

  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body>
        <SessionProvider>
          <AuthProvider>
            <CartProvider>
              <FoodOrderProvider>
                <MediaManagerProvider> {/* ✅ Wrap entire app */}
                  <MediaManagerModal /> {/* ✅ Render modal once globally */}
                  <Nav />
                  <QueryClientProvider client={queryClient}>
                    <Providers>
                      <Provider store={musicStore}>
                        <ModalManager>
                          <GlobalLoader />
                          <SearchSite />
                          {children}
                          <SiteFooter />
                        </ModalManager>
                      </Provider>
                    </Providers>
                  </QueryClientProvider>
                  <Notifications />
                </MediaManagerProvider>
              </FoodOrderProvider>
            </CartProvider>
          </AuthProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
