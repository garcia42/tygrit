import App, {AppProps} from 'next/app'
import { useRouter } from "next/router";
import Script from "next/script";
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
    <>
      <Script strategy="afterInteractive" id="talkto" type="text/javascript"
          dangerouslySetInnerHTML={{__html: `
          var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
          (function(){
          var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
          s1.async=true;
          s1.src='https://embed.tawk.to/62a961ab7b967b11799498eb/1g5qnkqlr';
          s1.charset='UTF-8';
          s1.setAttribute('crossorigin','*');
          s0.parentNode.insertBefore(s1,s0);
          })();`}}
          />
    <Component2 {...pageProps} />
    </>
  );
}

export default MyApp
