/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/jsx-props-no-spreading */
import "../styles/globals.css";
import type { AppProps } from "next/app";
const App = ({ Component, pageProps }: AppProps) => <Component {...pageProps} />;
export default App;
