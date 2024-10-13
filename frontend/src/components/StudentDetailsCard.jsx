import React from 'react';

const StudentDetailsCard = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-lg font-semibold text-gray-600 mb-4">Student Details</h2>
      <div>
        <p><strong>Name:</strong> John Doe</p>
        <p><strong>Roll Number:</strong> 123456</p>
        <p><strong>Hostel ID:</strong> H2021</p>
        <p><strong>Email:</strong> john.doe@example.com</p>
      </div>
    </div>
  );
};

export default StudentDetailsCard;
