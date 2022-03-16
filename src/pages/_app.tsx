import type { AppProps } from "next/app";
import { SessionProvider as NextAuthProvider } from "next-auth/react";
import { ChakraProvider } from "@chakra-ui/react";

import { theme } from "../styles/theme";
import { AuthContextProvider } from "../context/AuthContext";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <NextAuthProvider session={pageProps.session}>      
      <AuthContextProvider>
      <ChakraProvider theme={theme}>                  
          <Component {...pageProps} />   
        </ChakraProvider>        
      </AuthContextProvider>      
    </NextAuthProvider>
  );
}

export default MyApp;
