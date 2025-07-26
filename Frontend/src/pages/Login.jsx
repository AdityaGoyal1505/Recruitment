import { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './Login.css';
function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Login.js or login handler logic
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('https://recruitment-5dyc.onrender.com/api/users/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (response.ok) {
      localStorage.setItem('user', JSON.stringify(data));

      // Navigate based on role
      const role = data.role?.toLowerCase(); // ensure lowercase for safety
      if (role === 'student') {
        window.location.href = '/studentdashboard';
      } else if (role === 'recruiter') {
        window.location.href = '/recruiterdashboard';
      } else {
        alert("Unknown role. Please contact support.");
      }

    } else {
      alert("Login failed: " + data.message);
      setError(data.message || 'Login failed');
    }
  };



  return (
    <>
      <Header />
      <div className="login-container">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="username">
            Username<span style={{ color: 'red' }}>*</span>
          </label>
          <input
            type="text"
            id="username"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <label htmlFor="password">
            Password<span style={{ color: 'red' }}>*</span>
          </label>
          <input
            type="password"
            id="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit">Login</button>
        </form>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <p>
          Don't have an account? <a href="/register">Register here</a>
        </p>
      </div>
      <Footer />
    </>
  );
}

export default LoginPage;
