import { ChakraProvider } from '@chakra-ui/react'
import { css, Global } from '@emotion/react'
import "@fontsource/heebo"
import 'focus-visible/dist/focus-visible'
import Router from 'next/router'
import NProgress from 'nprogress'
import { useEffect } from 'react'
import TagManager from 'react-gtm-module'
import '../styles/globals.css'
import '../styles/Slider.css'
import { theme } from '../styles/theme'

const GlobalStyles = css`
  /*
    This will hide the focus indicator if the element receives focus    via the mouse,
    but it will still show up on keyboard focus.
  */
  .js-focus-visible :focus:not([data-focus-visible-added]) {
     outline: none;
     box-shadow: none;
   }
`;

function App({ Component, pageProps }) {

  // NProgress.configure({ showSpinner: false });

  useEffect(() => {
    if(process.env.NEXT_PUBLIC_GTM_ID !== undefined && process.env.NEXT_PUBLIC_GTM_ID.length > 0){
      TagManager.initialize({ gtmId: process.env.NEXT_PUBLIC_GTM_ID });
    }
  }, []);

  Router.events.on('routeChangeStart', ()=>{
    NProgress.start();
  });
  Router.events.on('routeChangeComplete', ()=>{
    NProgress.done();
  });
  Router.events.on('routeChangeError', ()=>{
    NProgress.done();
  });

  return (
    <ChakraProvider theme={theme}>
      <Global styles={GlobalStyles} />
        <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default App