import React from 'react';
import RssIcon from '../../assets/svg/rs_school_js.svg';
import GithubIcon from '../../assets/svg/github.svg';

export const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <a
        className="footer__rss-container footer__link"
        href="https://rs.school/react/"
        target="_blank"
      >
        <RssIcon className="footer__rss-icon" />
      </a>
      <div className="footer__links">
        <a
          className="footer__link"
          href="https://github.com/alenzija"
          target="_blank"
        >
          <GithubIcon className="footer__svg" />
          <span className="footer__link-name">alenzija</span>
        </a>

        <a
          className="footer__link"
          href="https://github.com/ritter1111"
          target="_blank"
        >
          <GithubIcon className="footer__svg" />
          <span className="footer__link-name">ritter1111</span>
        </a>

        <a
          className="footer__link"
          href="https://github.com/zweroboy1"
          target="_blank"
        >
          <GithubIcon className="footer__svg" />

          <span className="footer__link-name">zweroboy1</span>
        </a>
      </div>

      <div className="footer__team">AAA Batteries &copy; 2023</div>
    </footer>
  );
};
