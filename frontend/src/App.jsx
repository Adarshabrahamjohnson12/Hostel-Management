import axios from 'axios';
import React, { useState } from 'react';
import AdminDash from './pages/AdminDash';

const App = () => {
  const [username, setUser] = useState('');
  const [password, setPass] = useState('');
  const [login, setLogIn] = useState(true);//false
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the form from submitting normally

    try {
      const response = await axios.post('http://localhost:5080/login', {
        username,
        password,
      });
      setMessage(response.data.message);
      setLogIn(response.data.login);
    } catch (error) {
      console.error('Error logging in:', error);
      setMessage('An error occurred');
    }
  };

  return (
    <div className='w-full h-full'>
      {login ? (
        <AdminDash login={login}/>
      ) : (
        <div className='p-16 bg-slate-300 m-auto w-full h-screen grid justify-center '>
          <h1 className='text-3xl font-semibold pb-4'>Hostal Management </h1>

          <form onSubmit={handleSubmit} className='grid gap-4 px-16 border-2 justify-center py-20'>
            <input
              type="text"
              value={username}
              onChange={(e) => setUser(e.target.value)}
              placeholder='Username'
              className='p-1'
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPass(e.target.value)}
              placeholder='Password'
              className='p-1'
            />
            <button type='submit' >Login</button>
          </form>
          {message && <p>{message}</p>} 
        </div>
      )}
    </div>
  );
};

export default App;
