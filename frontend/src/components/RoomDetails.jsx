import React from 'react';

const RoomDetails = ({userData}) => {
  const username = userData.Hno;

  

  
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-lg font-semibold text-gray-600 mb-4">Room Details</h2>
      <div>
        <p><strong>Room Number:</strong> 101</p>
        <p><strong>Roommates:</strong> Jane Smith, Bob Johnson</p>
        <p><strong>Floor:</strong> 1st Floor</p>
      </div>
    </div>
  );
};

export default RoomDetails;
