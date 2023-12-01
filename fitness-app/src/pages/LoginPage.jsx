import { useState } from 'react';
import './LoginPage.css';
import axios from 'axios';

function Login() {
  const [user, setUser] = useState({ username: '', password: '' });
  const handleChange = (name, e) => {
    setUser({ ...user, [name]: e.target.value });
  };
  const handleSubmit = async () => {
    const res = await axios.get('http://localhost:8080/api/ingredient/', {
      headers: {
        Authorization:
          'Bearer ' +
          'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0dXNlciIsImV4cCI6MTcwMTQ3NzE0OSwiaWF0IjoxNzAxNDQxMTQ5fQ.6dmvuToJEvcMWqXA5dxYwxOdlR1ME5I5bU8AsgWg8xk',
      },
    });
    console.log(res.data);
  };

  return (
    <div className='container py-3'>
      <div className='row'>
        <div className='col-md-6'>
          <div className='container'>
            <div className='row justify-content-center'>
              <img
                src='AnhCorgiDeThuong.svg'
                id='anhCorgi'
                width='100%'
                className='img-flulid'
                alt=''
              />
            </div>
          </div>
        </div>

        <div className='col-md-6'>
          <div className='login-container form-container'>
            <h2>Login</h2>
            <form>
              <div className='form-group'>
                <label>Username:</label>
                <input
                  type='text'
                  id='username'
                  className='form-control'
                  placeholder='Enter your username'
                  value={user.username}
                  onChange={(e) => handleChange('username', e)}
                />
              </div>

              <div className='form-group'>
                <label>Password:</label>
                <input
                  type='password'
                  name=''
                  id='password'
                  className='form-control'
                  placeholder='Enter your password'
                  value={user.password}
                  onChange={(e) => handleChange('password', e)}
                />
              </div>

              <div id='signup' className='float-right mb-3'>
                <a href='signup.html'>Sign Up</a>
              </div>
              <div id='forgotpassword' className='float-left mb-3'>
                <a href='passwordrecover.html'>Forgot Password?</a>
              </div>

              <div className='container'>
                <button type='button' className='btn btn-block btn-primary'>
                  Login
                </button>
                <button
                  type='button'
                  onClick={handleSubmit}
                  className='btn gmail-btn'
                >
                  <i className='bi bi-google'></i> Login with Gmail
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
