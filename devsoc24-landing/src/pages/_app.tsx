import { type AppType } from "next/dist/shared/lib/utils";

import "@/styles/globals.css";

const MyApp: AppType = ({ Component, pageProps }) => {
  return <Componet {...pageProps} />;
};

export default MyApp;
