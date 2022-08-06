import { ChakraProvider } from '@chakra-ui/react'
import { css, Global } from '@emotion/react'
import "@fontsource/heebo"
import 'focus-visible/dist/focus-visible'
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

  return (
    <ChakraProvider theme={theme}>
      <Global styles={GlobalStyles} />
        <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default App