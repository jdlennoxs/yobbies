import React, { useState } from "react";
import Link from "next/link";

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false)

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
          className={"navbar-burger " + (isOpen ? "is-active" : "")}
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div id="navbarBasicExample" className={"navbar-menu " + (isOpen ? "is-active" : "")}>
        <div className="navbar-start">
          <Link href="/movies">
            <a className="navbar-item">Movies</a>
          </Link>

          <Link href="/awards">
            <a className="navbar-item">Awards</a>
          </Link>

          <Link href="/stats">
            <a className="navbar-item">Stats</a>
          </Link>
        </div>
      </div>
    </nav>
  );
}
