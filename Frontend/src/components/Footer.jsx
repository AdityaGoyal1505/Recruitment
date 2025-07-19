import './Footer.css';
import { ArrowUp } from 'lucide-react'; // Install lucide-react if needed
import { Linkedin, Twitter, Instagram } from 'lucide-react';
function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Brand Info */}
        <div className="footer-brand">
          <h2 className="footer-logo">
            <span className="logo-highlight">Go</span>Job
          </h2>
          <p className="footer-text">
            Helping professionals and freshers find the right job and grow their careers.
          </p>

          {/* Social Icons */}
          <div className="social-icons">
            <a href="https://linkedin.com" target="_blank" rel="noreferrer"><Linkedin size={24} /></a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer"><Instagram size={24} /></a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer"><Twitter size={24} /></a>
          </div>
        </div>

        {/* Footer Links */}
        <div className="footer-links">
          <div className="footer-column">
            <h4>Company</h4>
            <a href="#">About</a>
            <a href="#">Careers</a>
            <a href="#">Blog</a>
          </div>
          <div className="footer-column">
            <h4>Resources</h4>
            <a href="#">Help Center</a>
            <a href="#">Community</a>
            <a href="#">Guides</a>
          </div>
          <div className="footer-column">
            <h4>Legal</h4>
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Use</a>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} GoJob. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
