import { Wrapper } from '../../shared';
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Login.css';

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
      const res = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          password,
          isHost: isHostRegistration, 
        }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || 'Registration failed');

      // Save user to localStorage
      localStorage.setItem('user', JSON.stringify(data));
      localStorage.setItem('token', data.token || '');

      // Navigate based on host status
      if (data.isHost) {
        navigate('/admin-listings');
      } else {
        navigate('/listings');
      }
    } catch (err) {
      setError(err.message);
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
