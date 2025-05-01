import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './signup.css';
import DeckIcon from '@mui/icons-material/Deck';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import axios from 'axios';
import logo from '../themabinti.png'

function Signup() {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatedPassword, setRepeatedPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (password !== repeatedPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters');
      setLoading(false);
      return;
    }

    try {
      await axios.post('http://localhost:5000/api/register', {
        userName,
        email,
        password,
      });
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-account">
      <img src={logo} style={{width:'200px',height:'100px',marginLeft:'25%'}} />
      <h2>Welcome to Themabinti!</h2>
      <p>Create account</p>
      {error && <p className="error">{error}</p>}
      <div className="first-visibility-off">
      </div>
      <div className="second-visibility-off">
      </div>
      <form onSubmit={handleSubmit}>
        <input
          className="signup-username-input"
          placeholder="Username*"
          type="text"
          required
          value={userName}
          onChange={(e) => {setUserName(e.target.value);e.target.style.fontSize = '15px';
            e.target.style.color = '#313133'}}
        />
        <input
          className="signup-email-input"
          placeholder="Email*"
          type="email"
          required
          value={email}
          onChange={(e) => {setEmail(e.target.value);e.target.style.fontSize = '15px';
            e.target.style.color = '#313133'}}
        />
        <input
          className="password-input"
          placeholder="Password*"
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          className="repeat-password-input"
          placeholder="Repeat password*"
          type="password"
          required
          value={repeatedPassword}
          onChange={(e) => setRepeatedPassword(e.target.value)}
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Signing up...' : 'Sign up'}
        </button>
      </form>
      <div className="terms-and-conditions">
        By continuing you agree to Themabinti’s <a>Terms and Conditions</a>
      </div>
      <div className="signup-support">
        For further support, you may visit the Help Center or contact our customer service team.
      </div>
      <h3>
        THEMABINTI
      </h3>
    </div>
  );
}

export default Signup;