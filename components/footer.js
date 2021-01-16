import React from "react";

export default function Footer() {
  return (
    <footer className="footer has-background-dark">
      <div className="container">
        <div className="content has-text-centered has-text-white">
          <p>Built by Jack Scott</p>
          <p>Film data provided by</p>
          <img src="/tmdb.svg" height="96" width="96" />
        </div>
      </div>
    </footer>
  );
}
