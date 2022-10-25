import "../../styles/globals.css";
import type { AppProps } from "next/app";
import { HttpProvider, liveHttpService } from "../http/HttpContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <HttpProvider value={liveHttpService}>
      <Component {...pageProps} />
    </HttpProvider>
  );
}

export default MyApp;
