import type { AppProps } from "next/app";
import { SessionProvider as NextAuthProvider } from "next-auth/react";
import { ChakraProvider } from "@chakra-ui/react";

import { theme } from "../styles/theme";

function MyApp({ Component, pageProps: { session, ...pageProps} }: AppProps) {
  return (
    <NextAuthProvider session={pageProps.session}>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </NextAuthProvider>
  );
}

export default MyApp;
