import React from 'react';

const StudentDetailsCard = ({userData}) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-lg font-semibold text-gray-600 mb-4">Student Details</h2>
      <div>
        <p><strong>Name:</strong> {userData.fname} {userData.lname}</p>
        <p><strong>Roll Number:</strong> R{userData.Rno}</p>
        <p><strong>Hostel ID:</strong> H{userData.Hno}</p>
        <p><strong>Email:</strong> {userData.email}</p>
      </div>
    </div>
  );
};

export default StudentDetailsCard;
