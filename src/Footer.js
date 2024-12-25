import React from "react";

const Footer = () => {
  return (
    <footer>
      <p>
        Created with <i className="fa fa-heart" style={{ color: "red" }}></i> by{" "}
        <a target="_blank" rel="noreferrer" href="https://florin-pop.com">
          Florin Pop
        </a>{" "}
        - Read how I created this and how you can join the challenge{" "}
        <a
          target="_blank"
          rel="noreferrer"
          href="https://www.florin-pop.com/blog/2019/03/double-slider-sign-in-up-form/"
        >
          here
        </a>
        .
      </p>
    </footer>
    
  );
};

export default Footer;
