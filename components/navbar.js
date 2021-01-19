import React from "react";
import Link from "next/link";

export default function NavBar() {
  return (
    <nav
      className="navbar is-dark"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="navbar-brand">
        <Link href="/">
          <a className="navbar-item">
            <img src="/yobbies.svg" width="112" height="28" />
          </a>
        </Link>

        <a
          role="button"
          className="navbar-burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div id="navbarBasicExample" className="navbar-menu">
        <div className="navbar-start">
          <Link href="/movies">
            <a className="navbar-item">Movies</a>
          </Link>
          <div className="navbar-item has-dropdown is-hoverable">
            <a className="navbar-link">Awards</a>

            <div className="navbar-dropdown has-background-black">
              <a className="navbar-item has-text-white">About</a>
              <a className="navbar-item has-text-white">Jobs</a>
              <a className="navbar-item has-text-white">Contact</a>
            </div>
          </div>

          <Link href="/stats">
            <a className="navbar-item">Stats</a>
          </Link>
        </div>
      </div>
    </nav>
  );
}
