import { Wrapper } from '../../shared';
import { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import './Login.css';
import api from '../../../api/axios';

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const isUserLogin = location.state?.isUserLogin ?? true;

  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const { data: loginData } = await api.post('/auth/login', { name, password });

      if (!loginData.name) {
        setError('Login failed: user not found');
        return;
      }

      if (isUserLogin && loginData.isHost) {
        setError('This account is a host. Use "Become a Host" to log in.');
        return;
      }
      if (!isUserLogin && !loginData.isHost) {
        setError('This account is not a host. Use normal login.');
        return;
      }

      localStorage.setItem('token', loginData.token);
      localStorage.setItem('user', JSON.stringify(loginData));

      navigate(isUserLogin ? '/listings' : '/admin-listings');
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Login failed');
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
