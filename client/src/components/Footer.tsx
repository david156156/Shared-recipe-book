import { FunctionComponent } from "react";

interface FooterProps {}

const Footer: FunctionComponent<FooterProps> = () => {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        <div className="footer-links">
          <a href="/about" className="footer-link">
            אודות
          </a>
          <a href="/contact" className="footer-link">
            צור קשר
          </a>
          <a href="/privacy" className="footer-link">
            מדיניות פרטיות
          </a>
        </div>
        <div className="footer-social">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fa-brands fa-facebook"></i>
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fa-brands fa-twitter"></i>
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fa-brands fa-instagram"></i>
          </a>
        </div>
        <div className="footer-text">
          <p>© 2025 כל הזכויות שמורות. ספר המתכונים המשותף.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
