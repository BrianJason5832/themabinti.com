import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from '../store/auth-slice';
import axios from 'axios';
import './login.css';
import DeckIcon from '@mui/icons-material/Deck';
import logo from '../themabinti.png'
import { Link } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:5000/api/login', {
        email,
        password,
      });

      dispatch(
        setUser({
          user: { userName: response.data.user.userName, email: response.data.user.email },
          token: response.data.token,
        })
      );

      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup">
      <img src={logo} style={{marginLeft: '25%', width:'200px', height:'100px' }} />
      <h2>Welcome to Mabinti</h2>
      <p>Type your e-mail to log in or <Link to='/signup' style={{color:'#a25aff'}}>create a Mabinti account.</Link></p>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          className="signup-email-input"
          placeholder="Email*"
          name="email"
          type="email"
          value={email}
          onChange={(e) => {setEmail(e.target.value); e.target.style.fontSize = '15px';
            e.target.style.color = '#313133';
          }}
          required
        />
        <input
          className="signup-email-input"
          placeholder="Password*"
          name="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <div className="signup-login-button">
          <button type="submit" disabled={loading}>
            {loading ? 'Logging in...' : 'Continue'}
          </button>
        </div>
      </form>
      <div className="terms-and-conditions">
        By continuing you agree to Mabinti’s <a>Terms and Conditions</a>
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

export default Login;