import React from "react";
import Link from "next/link";

export default function NavBar() {
  return (
    <nav class="navbar is-dark" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <Link href="/">
          <a class="navbar-item">
            <img src="/yobbies.svg" width="112" height="28" />
          </a>
        </Link>

        <a
          role="button"
          class="navbar-burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div id="navbarBasicExample" class="navbar-menu">
        <div class="navbar-start">
          <Link href="/movies">
            <a class="navbar-item">Movies</a>
          </Link>
          <div class="navbar-item has-dropdown is-hoverable">
            <a class="navbar-link">Awards</a>

            <div class="navbar-dropdown has-background-black">
              <a class="navbar-item has-text-white">About</a>
              <a class="navbar-item has-text-white">Jobs</a>
              <a class="navbar-item has-text-white">Contact</a>
            </div>
          </div>

          <Link href="/stats">
            <a class="navbar-item">Stats</a>
          </Link>
        </div>
      </div>
    </nav>
  );
}
