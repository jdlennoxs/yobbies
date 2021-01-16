import Footer from "../components/footer";
import NavBar from "../components/navbar";
import "../styles/globals.scss";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <NavBar />
      <div class="page-wrapper">
        <Component {...pageProps} />
      </div>
      <Footer />
    </>
  );
}

export default MyApp;
