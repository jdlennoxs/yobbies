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
      <section class="hero is-medium mt-6">
        <div class="block hero-body">
          <div class="container has-text-centered mb-3 ">
            <div class="block">
              <img src="full-yobbies.svg" height="256" width="256" />
            </div>
            <div class="content block is-large">
              <p class="gradient-text">
                Your invitation to the ultimate awards show.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section class="section mb-6">
        <div class="container">
          <div class="columns is-centered is-multiline block">
            <div class="column is-one-third">
              <Link href="/movies">
                <div class="box has-background-dark">
                  <a class="content has-text-centered">
                    <h2 class="m-2 gradient-text">Movies</h2>
                  </a>
                </div>
              </Link>
            </div>
            <div class="column is-one-third">
              <Link href="/awards">
                <div class="box has-background-dark">
                  <a class="content has-text-centered">
                    <h2 class="m-2 gradient-text">Awards & Nominees</h2>
                  </a>
                </div>
              </Link>
            </div>
            <div class="column is-one-third">
              <Link href="/state">
                <div class="box has-background-dark">
                  <a class="content has-text-centered">
                    <h2 class="m-2 gradient-text">Statistics</h2>
                  </a>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>
      <section class="section mb-6">
        <div class="content is-medium has-text-centered m-6">
          <p class="gradient-text">
            "The only award I truly want to win" - Octavia Spencer
          </p>
        </div>
      </section>
    </div>
  );
}
