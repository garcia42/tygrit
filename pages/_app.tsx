import App, {AppProps} from 'next/app'
import { useRouter } from "next/router";
import React, { useEffect } from "react";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  const handleRouteChange = (url:string) => {
    (window as any).gtag('config', process.env.NEXT_PUBLIC_GA, {
      page_path: url,
    });
  };

  useEffect(() => {
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  var Component2 = (Component as any)
  return (
    <Component2 {...pageProps} />
  );
}

export default MyApp
