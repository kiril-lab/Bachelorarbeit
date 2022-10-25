import "../../styles/globals.css";
import type { AppProps } from "next/app";
import { HttpProvider, liveHttpService } from "../http/HttpContext";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "../state";

function MyApp({ Component, pageProps }: AppProps) {
  return (
      <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
      <HttpProvider value={liveHttpService}>
        <Component {...pageProps} />
      </HttpProvider>
      </PersistGate>
      </Provider>
  );
}

export default MyApp;
