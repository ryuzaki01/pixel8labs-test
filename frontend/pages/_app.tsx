import { Router } from 'next/router'
import type { AppProps } from 'next/app'
import { globalReset } from 'stitches.config'
import { SessionProvider } from 'next-auth/react';
import * as Tooltip from '@radix-ui/react-tooltip'
import ToastContextProvider from 'contexts/ToastContextProvider'
import nProgress from 'nprogress'
import 'nprogress/nprogress.css'

nProgress.configure({
  showSpinner: false,
})

Router.events.on("routeChangeStart", nProgress.start);
Router.events.on("routeChangeError", nProgress.done);
Router.events.on("routeChangeComplete", nProgress.done);

function AppWrapper(props: AppProps) {
  const { session, ...appProps } = props;
  return (
    <SessionProvider session={session}>
      <MyApp {...appProps} />
    </SessionProvider>
  )
}

function MyApp({
 Component,
 pageProps,
}: AppProps) {
  globalReset()

  return (
    <Tooltip.Provider>
      <ToastContextProvider>
        <Component {...pageProps} />
      </ToastContextProvider>
    </Tooltip.Provider>
  )
}

export default AppWrapper
