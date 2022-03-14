import Footer from "../components/footer";
import NavBar from "../components/navbar";
import "../styles/globals.scss";
import { ApolloProvider } from "@apollo/client";
import client from "../apollo-client";
import PlausibleProvider from "next-plausible";

function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <PlausibleProvider
        domain="yobbies.jdlennoxs.com"
        selfHosted={true}
        scriptProps={{
          src: "https://analytics.jdlennoxs.com/js/plausible.js",
        }}
      >
        <NavBar />
        <div className="page-wrapper">
          <Component {...pageProps} />
        </div>
        <Footer />
      </PlausibleProvider>
    </ApolloProvider>
  );
}

MyApp.getInitialProps = async ({ Component, ctx }) => {
  const pageProps = Component.getInitialProps
    ? await Component.getInitialProps(ctx)
    : {};
  if (Object.keys(pageProps).length > 0) {
    return { pageProps };
  } else {
    return {};
  }
};

export default MyApp;
