import "../styles/globals.css";
import NextNProgress from "nextjs-progressbar";
import "react-circular-progressbar/dist/styles.css";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <NextNProgress color="#ea580c" height={3} showOnShallow={true} />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
