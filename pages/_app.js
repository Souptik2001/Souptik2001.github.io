import { ChakraProvider } from '@chakra-ui/react'
import { css, Global } from '@emotion/react'
import "@fontsource/heebo"
import 'focus-visible/dist/focus-visible'
import { useEffect } from 'react'
import TagManager from 'react-gtm-module'
import '../styles/globals.css'
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

  useEffect(() => {
    if(process.env.NEXT_PUBLIC_GTM_ID !== undefined && process.env.NEXT_PUBLIC_GTM_ID.length > 0){
      TagManager.initialize({ gtmId: process.env.NEXT_PUBLIC_GTM_ID });
    }
  }, []);

  return (
    <ChakraProvider theme={theme}>
      <Global styles={GlobalStyles} />
        <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default App