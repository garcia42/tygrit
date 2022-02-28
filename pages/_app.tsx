import type { AppProps } from 'next/app'
import { useRouter } from "next/router";
import Script from "next/script";
import { useEffect } from "react";

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

  return (
  <>
    <Script
      strategy="afterInteractive"
      src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA}`}
    />
    <Script
      id="gtag-init"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${process.env.NEXT_PUBLIC_GA}', {
            page_path: window.location.pathname,
          });
          gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ADS}');
        `,
      }}
    />
    <Component {...pageProps} />
  </>);
}

export default MyApp
