import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Make sure to import axios

const ComplaintsTableA = () => {
  const [data, setData] = useState([]); // Initialize as an array
  const [message, setMessage] = useState(''); // Initialize message state

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post('http://localhost:5080/complaints');
        setData(response.data.users || []); // Ensure we set an empty array if no users
      } catch (error) {
        console.error('Error fetching user details:', error);
        setMessage('An error occurred');
      }
    };
    fetchData();
  }, []);

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-lg font-semibold text-gray-600 mb-4">Complaints</h2>
      {message && <p className="text-red-500">{message}</p>} {/* Show error message if any */}
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2">Student Name</th>
            <th className="py-2">Complaint</th>
            <th className="py-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {data.map((prop, index) => (
            <tr key={index}>
              <td className="py-2">{prop[0]} {prop[1]}</td>
              <td className="py-2">{prop[2]}</td>
              <td className="py-2">{prop[3] ? "Resolved" : "Pending"}</td>
            </tr>
          ))}
          {/* The below static rows can be removed if you only want to display fetched data */}
          {/* <tr>
            <td className="py-2">John Doe</td>
            <td className="py-2">Room AC not working</td>
            <td className="py-2">Pending</td>
          </tr>
          <tr>
            <td className="py-2">Jane Smith</td>
            <td className="py-2">Leaky faucet</td>
            <td className="py-2">Resolved</td>
          </tr> */}
        </tbody>
      </table>
    </div>
  );
};

export default ComplaintsTableA;
