import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import StatsCard from './StatsCard';
import StudentsTable from './StudentsTable';
import RoomsTable from './RoomsTable';
import ComplaintsTable from './ComplaintsTable';

const AdminDashboard = ({username}) => {
  
  
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
        {/* <Header userType="Admin" /> */}
        
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
