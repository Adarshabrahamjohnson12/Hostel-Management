import axios from 'axios';
import React, { useState } from 'react';
import back2 from '../assets/back2.png';
import AdminDashboard from '../components/AdminDashboard';
import StudentDashboard from '../components/StudentDashboard';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const HomePage = () => {
  const [username, setUser] = useState('');
  const [password, setPass] = useState('');
  const [login, setLogIn] = useState(false);
  const [message, setMessage] = useState('');
  const [dislogin, setDislogin] = useState(true);
  const [userType, setUserType] = useState('');
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the form from submitting normally

    try {
      const response = await axios.post('http://localhost:5080/login', {
        username,
        password,
        userType,
      });
      setMessage(response.data.message);
      setLogIn(response.data.login);
      enqueueSnackbar('Login successful', { variant: 'success' });

      // Navigate based on userType
      if (response.data.login) {
        if (userType === "student") {
          navigate(`/student/${username}`); // Navigate to StudentDashboard
        } else {
          navigate('/admin'); // Navigate to AdminDashboard
        }
      }
    } catch (error) {
      console.error('Error logging in:', error);
      setMessage('An error occurred');
      enqueueSnackbar('Try again ', { variant: 'error' });
    }
  };

  return (
    <div className='w-full h-full'>
      {!login ? (
        <div className='bg-slate-300 relative m-auto w-full h-screen'>
          <section className={`${dislogin ? 'hidden transition-opacity' : 'transition-colors'} z-50 fixed w-[80vw] rounded mx-32 mt-12 bg-gray-200`}>
            <img className='z-0 absolute opacity-60 w-full rounded'
              src="https://scontent.fccj6-2.fna.fbcdn.net/v/t39.30808-6/310154025_414009510897391_686990474207141427_n.jpg?stp=dst-jpg_s960x960&_nc_cat=105&ccb=1-7&_nc_sid=cc71e4&_nc_ohc=Ac2KUTcGfWMQ7kNvgHrepBi&_nc_ht=scontent.fccj6-2.fna&_nc_gid=AbeTQNsb07CWpWaFNcFEVqE&oh=00_AYAZnKgQt2olqtXJe4biK4t6vU83HiA55R1jYPqZt4rcvQ&oe=6713102A" alt="" />
            <div className="container relative z-10 py-10 mx-auto text-center bg-gray-200 w-[32%] mt-10 opacity-95 ">
              <button onClick={() => { setDislogin(true) }} className='font-medium text-2xl pb-8'>Home</button>
              <h3 className="text-3xl font-bold mb-8">Login</h3>
              <form onSubmit={handleSubmit} className='grid gap-4 mt-4 px-16 justify-center opacity-100'>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUser(e.target.value)}
                  placeholder='Username'
                  className='p-2 border border-gray-300 rounded'
                />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPass(e.target.value)}
                  placeholder='Password'
                  className='p-2 border border-gray-300 rounded'
                />
                <span>
                  <label htmlFor="userType">Admin</label>
                  <input
                    type='radio'
                    name='SelAdmin'
                    value="userType"
                    onClick={() => setUserType("admin")}
                    className='ml-4'
                  />
                </span>
                <span>
                  <label htmlFor="Student">Student</label>
                  <input
                    type='radio'
                    name='SelAdmin'
                    value="Student"
                    onClick={() => setUserType("student")}
                    className='ml-4'
                  />
                </span>
                <button type='submit' className='bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700'>Login</button>
              </form>
              {message && <p className="mt-4 text-green-600">{message}</p>}
            </div>
          </section>

          <div className={`${dislogin ? '' : 'blur-md'} min-h-screen bg-gray-100`}>
            {/* Navigation Bar */}
            <nav className="bg-blue-600 p-4">
              <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-white text-2xl font-bold">Hostel Management System</h1>
                <ul className="flex space-x-4">
                  <li><a href="#features" className="text-white hover:text-blue-200">Features</a></li>
                  <li><a href="#about" className="text-white hover:text-blue-200">About</a></li>
                  <li><a href="#contact" className="text-white hover:text-blue-200">Contact</a></li>
                </ul>
              </div>
            </nav>

            {/* Hero Section */}
            <section className="bg-blue-200 py-20">
              <div className="container mx-auto text-center">
                <h2 className="text-4xl font-bold mb-4">Welcome to Our Hostel Management System</h2>
                <p className="text-lg mb-6">Streamline your hostel management with ease and efficiency.</p>
                <button onClick={() => { setDislogin(false) }} className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">Get Started</button>
              </div>
            </section>

            {/* Features Section */}
            <section id="features" className="py-20">
              <div className="container mx-auto text-center">
                <h3 className="text-3xl font-bold mb-8">Features</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="bg-white p-6 rounded-lg shadow-lg">
                    <h4 className="text-xl font-semibold mb-2">Room Booking</h4>
                    <p>Easy room booking process with real-time availability.</p>
                  </div>
                  <div className="bg-white p-6 rounded-lg shadow-lg">
                    <h4 className="text-xl font-semibold mb-2">Maintenance Requests</h4>
                    <p>Submit maintenance requests quickly and track their status.</p>
                  </div>
                  <div className="bg-white p-6 rounded-lg shadow-lg">
                    <h4 className="text-xl font-semibold mb-2">Payment Management</h4>
                    <p>Manage payments and keep track of transactions effortlessly.</p>
                  </div>
                </div>
              </div>
            </section>

            {/* About Section */}
            <section id="about" className="relative">
              <img src={back2} className='w-full bg-black opacity-30 absolute' alt="" />
              <div className="container py-20 mx-auto text-center">
                <h3 className="text-3xl font-bold mb-8">About Us</h3>
                <p className="max-w-xl mx-auto mb-4">
                  Our hostel management system is designed to simplify the management of hostels for colleges, ensuring a seamless experience for students and administrators alike.
                </p>
              </div>
            </section>

            {/* Contact Section */}
            <section id="contact" className="py-20">
              <div className="container mx-auto text-center">
                <h3 className="text-3xl font-bold mb-8">Contact Us</h3>
                <p className="mb-4">For inquiries, please reach out to us at:</p>
                <p className="font-semibold">contact@hostelmanagement.com</p>
              </div>
            </section>

            {/* Footer */}
            <footer className="bg-blue-600 py-4 text-center text-white">
              <p>&copy; 2024 Hostel Management System. All rights reserved.</p>
            </footer>
          </div>
        </div>
      ) : null /* Render nothing or a loading state while navigating */ }
    </div>
  );
};

export default HomePage;
