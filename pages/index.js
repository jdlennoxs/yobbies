import Head from "next/head";
import Link from "next/link";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Welcome to the Yobbies</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section className="hero is-medium mt-6">
        <div className="block hero-body">
          <div className="container has-text-centered mb-3 ">
            <div className="block">
              <img src="full-yobbies.svg" height="256" width="256" />
            </div>
            <div className="content block is-large">
              <p className="gradient-text">
                Your invitation to the ultimate awards show.
              </p>
              <div className="content">
                <p className="subtitle">Sponsored by</p>
                <img src="nutrigrain.png" style={{ height: "140px" }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section mb-6">
        <div className="container">
          <div className="columns is-centered is-multiline block">
            <div className="column is-one-third">
              <Link href="/movies">
                <div className="box has-background-dark">
                  <a className="content has-text-centered">
                    <h2 className="m-2 gradient-text">Movies</h2>
                  </a>
                </div>
              </Link>
            </div>
            <div className="column is-one-third">
              <Link href="/awards">
                <div className="box has-background-dark">
                  <a className="content has-text-centered">
                    <h2 className="m-2 gradient-text">Awards</h2>
                  </a>
                </div>
              </Link>
            </div>
            <div className="column is-one-third">
              <Link href="/state">
                <div className="box has-background-dark">
                  <a className="content has-text-centered">
                    <h2 className="m-2 gradient-text">Statistics</h2>
                  </a>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>
      <section className="section mb-6">
        <div className="content is-medium has-text-centered m-6">
          <p className="gradient-text">
            "The only award I truly want to win" - Octavia Spencer
          </p>
        </div>
      </section>
    </div>
  );
}
