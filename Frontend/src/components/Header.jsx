import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import './Header.css';

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    setIsLoggedIn(!!storedUser);
  }, []);


  const handleLogout = () => {
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    navigate("/login");
  };


  return (
    <header className="header">
      <div className="container">
        <div className="header-content">

          {/* Logo */}
          <Link to="/" className="logo">
            Go<span className="highlight">Job</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="nav-links">
            <Link to="/jobs">Find Your Jobs</Link>
            <Link to="#">Companies</Link>
            <Link to="#">Resources</Link>

            {isLoggedIn ? (
              <>
                <button
                  onClick={() => {
                    const user = JSON.parse(localStorage.getItem('user'));
                    if (user && user.role === 'student') {
                      navigate('/studentdashboard');
                    } else if (user && user.role === 'recruiter') {
                      navigate('/recruiterdashboard');
                    } else {
                      navigate('/login');
                    }
                  }}
                  id="dashboard-link"
                >
                  Dashboard
                </button>

                <button onClick={handleLogout} id="logout-link">Logout</button>
              </>
            ) : (
              <>
                <button onClick={() => navigate('/login')} id="login-link">Login</button>
                <button onClick={() => navigate('/register')} id="register-link">Register</button>
              </>
            )}
          </nav>

          {/* Hamburger Menu Icon */}
          <div className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="mobile-menu">
          <Link to="/jobs" onClick={() => setMenuOpen(false)}>Find Jobs</Link>
          <Link to="#" onClick={() => setMenuOpen(false)}>Companies</Link>
          <Link to="#" onClick={() => setMenuOpen(false)}>Resources</Link>

          {isLoggedIn ? (
            <>
              <button onClick={() => { setMenuOpen(false); navigate('/dashboard'); }}>Dashboard</button>
              <button onClick={() => { setMenuOpen(false); handleLogout(); }}>Logout</button>
            </>
          ) : (
            <>
              <button onClick={() => { setMenuOpen(false); navigate('/login'); }}>Login</button>
              <button onClick={() => { setMenuOpen(false); navigate('/register'); }}>Register</button>
            </>
          )}
        </div>
      )}
    </header>
  );
}

export default Header;
