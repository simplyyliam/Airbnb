import { Wrapper } from '../../shared'
import { useState } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import './Login.css'

export default function LoginPage () {
  const navigate = useNavigate()
  const location = useLocation()
  const isUserLogin = location.state?.isUserLogin

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async e => {
    e.preventDefault()
    setError('')

    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.message || 'Login failed')

      localStorage.setItem('token', data.token)
      localStorage.setItem('user', JSON.stringify(data.user))

      if (isUserLogin) {
        if (data.user.isHost) {
          setError('This account is a host. Use "Become a Host" to log in.')
          return
        }
        navigate('/listings')
      } else {
        if (!data.user.isHost) {
          setError('This account is not a host. Use normal login.')
          return
        }
        navigate('/admin-listings')
      }
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <Wrapper className='login-container'>
      <form onSubmit={handleSubmit}>
        <h1>{isUserLogin ? 'User Login' : 'Host Login'}</h1>
        {error && <p className='error'>{error}</p>}

        <div className='input-field'>
          <p>Email</p>
          <input
            type='email'
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </div>

        <div className='input-field'>
          <p>Password</p>
          <input
            type='password'
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </div>

        <button type='submit'>Login</button>

        <p className='register-link'>
          Don't have an account?{' '}
          <Link to='/register' state={{ isUserLogin }}>
            Register
          </Link>
        </p>
      </form>
    </Wrapper>
  )
}
