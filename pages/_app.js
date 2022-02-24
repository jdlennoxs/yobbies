import Footer from "../components/footer";
import NavBar from "../components/navbar";
import "../styles/globals.scss";
import { ApolloProvider } from "@apollo/client";
import client from "../apollo-client";

function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <NavBar />
      <div className="page-wrapper">
        <Component {...pageProps} />
      </div>
      <Footer />
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
