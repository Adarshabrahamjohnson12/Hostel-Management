import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import axios from 'axios';
import StudentDetailsCard from './StudentDetailsCard';
import RoomDetails from './RoomDetails';
import ComplaintsTable from './ComplaintsTable';
import ComplaintForm from './ComplaintForm';
import PaymentHistory from './PaymentHistory';

const StudentDashboard = ({ username }) => {
  const [userData, setUserData] = useState({}); // Object to store user data
  const [message, setMessage] = useState('');
  const [login, setLogIn] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post('http://localhost:5080/userdetails', {
          username, // send username as the payload
        });
        setMessage(response.data.message);
        setLogIn(response.data.login);
        if (response.data.login) {
          // Store the fetched data in userData
          setUserData({
            full_name: response.data.full_name,
            Rno: response.data.Rno,
            Hno: response.data.Hno,
            email: response.data.e_mail,
          });
        }
      } catch (error) {
        console.error('Error fetching user details:', error);
        setMessage('An error occurred');
      }
    };

    if (true) {
      fetchData(); // Call the async function when the username is available
    }
  }, [username]); // Re-run the effect when username changes

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar for navigation */}
      <Sidebar userRole="student" />

      {/* Main content */}
      <div className="flex-1 p-6 ml-64">
        <Header userType="Student" />

        {/* Student info and room details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {true ? (

            <StudentDetailsCard userData={userData} />

          ) : (
            <p>Loading student details...</p>

          )}
          <RoomDetails />
        </div>

        {/* Complaints section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ComplaintsTable />
          <ComplaintForm />
        </div>

        {/* Payment history */}
        <div className="mt-6">
          <PaymentHistory />
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
