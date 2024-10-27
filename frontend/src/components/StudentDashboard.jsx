import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import axios from 'axios';
import StudentDetailsCard from './StudentDetailsCard';
import RoomDetails from './RoomDetails';
import ComplaintsTable from './ComplaintsTable';
import ComplaintForm from './ComplaintForm';
import PaymentHistory from './PaymentHistory';
import Footer from './Footer';
import { useParams } from 'react-router-dom';
import MessDash from './MessDash';

const StudentDashboard = () => {

  const params = useParams();
  const username = params.id;
  const [userData, setUserData] = useState({}); // Object to store user data
  const [message, setMessage] = useState('');
  const [login, setLogIn] = useState(false);
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post('http://localhost:5080/userdetails', {
          username, // Send username as the payload
        });

        setMessage(response.data.message);
        setLogIn(response.data.login);

        if (response.data.login) {
          // Store the fetched data in userData
          setUserData({
            fname: response.data.fname,
            lname: response.data.lname,
            Rno: response.data.Rno,
            Hno: response.data.Hno,
            email: response.data.e_mail,
          });
        }
      } catch (error) {
        console.error('Error fetching user details:', error);
        setMessage('An error occurred');
      } finally {
        setLoading(false); // Set loading to false after API call
      }
    };

    fetchData(); // Call the async function when the username is available
  }, [username]); // Re-run the effect when username changes

  if (loading) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <span className='animate-ping bg-slate-600 w-60 h-60 rounded-full flex justify-center items-center text-3xl'>Loading.. </span>
      </div>
    ) // Show loading state
  }

  return (
    <div className="lg:flex h-screen bg-gray-100">
      {/* Sidebar for navigation */}
      <Sidebar userRole="student" />

      {/* Main content */}
      <div className="flex-1 p-6 lg:ml-64">
        <Header userType="Student" userData={userData} />

        {/* Student info and room details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <StudentDetailsCard userData={userData} />
          <RoomDetails userData={userData} />
        </div>

        {/* Complaints section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <MessDash />
          <ComplaintsTable />
          <ComplaintForm />
        </div>

        {/* Payment history */}
        <div className="my-6">
          <PaymentHistory />
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default StudentDashboard;
