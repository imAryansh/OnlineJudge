import React from "react";

function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer>
      <p>Copyright ⓒ {year} OJ by Aryansh</p>
    </footer>
  );
}

export default Footer;
