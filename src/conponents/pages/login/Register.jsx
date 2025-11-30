import { Wrapper } from '../../shared';
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Login.css';
import api from '../../../api';

export default function RegisterPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const isUserRegister = location.state?.isUserRegister ?? false;
  const isHostRegistration = location.state?.isHostRegister ?? !isUserRegister;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const { data } = await api.post('/auth/register', {
        name,
        email,
        password,
        isHost: isHostRegistration,
      });

      localStorage.setItem('user', JSON.stringify(data));
      localStorage.setItem('token', data.token || '');

      if (data.isHost) navigate('/admin-listings');
      else navigate('/listings');
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Registration failed');
    }
  };

  return (
    <Wrapper className='login-container'>
      <form onSubmit={handleSubmit}>
        <h1>{isHostRegistration ? 'Host Register' : 'User Register'}</h1>
        {error && <p className='error'>{error}</p>}

        <div className='input-field'>
          <p>Name</p>
          <input
            type='text'
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className='input-field'>
          <p>Email</p>
          <input
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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

        <button type='submit'>Register</button>
      </form>
    </Wrapper>
  );
}
