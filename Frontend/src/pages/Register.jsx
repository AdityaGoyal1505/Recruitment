import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './Login.css';

function RegisterPage() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    const roleLower = role.toLowerCase().trim();
    if (!email || !username || !password || !roleLower) {
      setError('All fields are required');
      return;
    }

    if (!['student', 'recruiter'].includes(roleLower)) {
      setError('Role must be either Student or Recruiter');
      return;
    }

    try {
      const response = await fetch('https://recruitment-5dyc.onrender.com/api/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password, email, role: roleLower }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || 'Registration failed');
      }

      const data = await response.json();
      localStorage.setItem('user', JSON.stringify(data)); // save user in localStorage

      // redirect based on role
      if (roleLower === 'student') {
        navigate('/complete'); // student completes profile
      } else {
        navigate('/completerec'); // recruiter completes profile
      }
    } catch (err) {
      setError(err.message || 'Registration failed');
    }
  };

  return (
    <>
      <Header />
      <div className='register-container'>
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
          <label>Email<span style={{ color: 'red' }}>*</span></label>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Username<span style={{ color: 'red' }}>*</span></label>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <label>Password<span style={{ color: 'red' }}>*</span></label>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <label>Role (Student/Recruiter)<span style={{ color: 'red' }}>*</span></label>
          <input
            type="text"
            placeholder="Student or Recruiter"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
          />

          <button type="submit">Register</button>
        </form>

        {error && <p style={{ color: 'red' }}>{error}</p>}
        <p>Already have an account? <a href="/login">Login here</a></p>
      </div>
      <Footer />
    </>
  );
}

export default RegisterPage;
