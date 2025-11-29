import { Wrapper } from '../../shared';
import { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import './Login.css';

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const isUserLogin = location.state?.isUserLogin ?? true; // true = normal user

  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const loginRes = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, password }), // login with name
      });

      const loginData = await loginRes.json();

      if (loginRes.ok) {
        // Ensure loginData has user
        if (!loginData.name) {
          setError('Login failed: user not found');
          return;
        }

        // Prevent logging in with wrong account type
        if (isUserLogin && loginData.isHost) {
          setError('This account is a host. Use "Become a Host" to log in.');
          return;
        }
        if (!isUserLogin && !loginData.isHost) {
          setError('This account is not a host. Use normal login.');
          return;
        }

        // Save user info & token
        localStorage.setItem('token', loginData.token);
        localStorage.setItem('user', JSON.stringify(loginData));

        navigate(isUserLogin ? '/listings' : '/admin-listings');
        return;
      }

      // Redirect to registration if user not found
      if (loginData.message === 'User not found' || loginData.message === 'Invalid credentials') {
        navigate('/register', { state: { isUserRegister: isUserLogin } });
        return;
      }

      setError(loginData.message || 'Login failed');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Wrapper className='login-container'>
      <form onSubmit={handleSubmit}>
        <h1>{isUserLogin ? 'User Login' : 'Host Login'}</h1>
        {error && <p className='error'>{error}</p>}

        <div className='input-field'>
          <p>Username</p>
          <input
            type='text'
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className='input-field'>
          <p>Password</p>
          <input
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type='submit'>Login</button>

        <p className='register-link'>
          Don't have an account?{' '}
          <Link to='/register' state={{ isUserRegister: isUserLogin }}>
            Register
          </Link>
        </p>
      </form>
    </Wrapper>
  );
}
