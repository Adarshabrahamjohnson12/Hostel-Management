import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import StudentDetailsCard from './StudentDetailsCard';
import RoomDetails from './RoomDetails';
import ComplaintsTable from './ComplaintsTable';
import ComplaintForm from './ComplaintForm';
import PaymentHistory from './PaymentHistory';

const StudentDashboard = ({username}) => {

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar for navigation */}
      <Sidebar userRole="student"  />
      
      {/* Main content */}
      <div className="flex-1 p-6 ml-64">
        <Header userType="Student"/>
        
        {/* Student info and room details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <StudentDetailsCard />
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
