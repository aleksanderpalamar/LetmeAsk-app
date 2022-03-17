import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";

import { theme } from "../styles/theme";
import { AuthContextProvider } from "../context/AuthContext";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (         
      <AuthContextProvider>
      <ChakraProvider theme={theme}>                  
          <Component {...pageProps} />   
        </ChakraProvider>        
      </AuthContextProvider>
  );
}

export default MyApp;
