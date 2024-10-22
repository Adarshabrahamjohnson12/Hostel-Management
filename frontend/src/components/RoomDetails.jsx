import axios from 'axios';
import React, { useEffect, useState } from 'react';

const RoomDetails = ({ userData }) => {
  const Hno = userData.Hno;
  const [message, setMessage] = useState('');
  const [roomDetails, setRoomDetails] = useState({});

  // API call
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post('http://localhost:5080/roomdetails', { Hno });
        setMessage(response.data.message);
        if (response.data) {
          setRoomDetails({
            RoomNo: response.data.Rono,
            Roomate: response.data.roomate || [], // Ensure it's an array
            Floor: response.data.floor,

          });
        }
      } catch (error) {
        console.error(error);
        setMessage('An error occurred');
      }
    };
    // const len = length(roomDetails.Roomate)

    fetchData(); // Call fetchData inside useEffect
  }, [Hno]);

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-lg font-semibold text-gray-600 mb-4">Room Details</h2>
      <div>
        <p><strong>Room Number:</strong> {roomDetails.RoomNo}</p>
        <p>
          <strong>Roommates:</strong> {roomDetails.Roomate 
            ? roomDetails.Roomate.join(', ')
            : 'None'}
        </p>
        <p><strong>Floor:</strong> {roomDetails.Floor}</p>
      </div>
      {message?'':<p className="text-red-500">{message}</p>} 
    </div>
  );
};

export default RoomDetails;
