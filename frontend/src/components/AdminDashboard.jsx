import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import StatsCard from './StatsCard';
import StudentsTable from './StudentsTable';
import RoomsTable from './RoomsTable';
import ComplaintsTable from './ComplaintsTable';
import { useParams } from 'react-router-dom';

const AdminDashboard = () => {
  
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
            full_name: response.data.full_name,
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

  
  const MenuDetails = {
    1: { id: 'Home', },
    2: { id: 'Register students', },
    3: { id: 'Attendence', },
    4: { id: 'Mes', },
    5: { id: 'Invoice', },

  }

  return (
    <div className="flex h-screen mb-32 bg-gray-100">
      {/* Sidebar for navigation */}
      <Sidebar userRole="admin" />
      
      {/* Main content */}
      <div className="flex-1  lg:ml-64 p-6">
        <Header userType="Admin" userData={userData} />
        
        {/* Stats section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <StatsCard title="Total Students" count="120" />
          <StatsCard title="Available Rooms" count="15" />
          <StatsCard title="Complaints" count="5" />
          <StatsCard title="Monthly Revenue" count="$12,000" />
        </div>
        
        {/* Tables section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <StudentsTable />
          <RoomsTable />
        </div>
        <div className="mt-6">
          <ComplaintsTable />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
