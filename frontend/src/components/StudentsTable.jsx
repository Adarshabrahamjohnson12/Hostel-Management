import axios from 'axios';
import React, { useEffect, useState } from 'react';

const StudentsTable = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get('http://localhost:5080/userdetails')
      setData(response.data.data || []);
    }
    fetchData()
  }, [])
  

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-lg font-semibold text-gray-600 mb-4">Students List</h2>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2">Name</th>
            <th className="py-2">Hno</th>
            <th className="py-2">Status</th>
          </tr>
        </thead>
        <tbody>

          {data.map((prop, index) => (
            <tr key={index}>
              <td className="py-2">{prop[0]} {prop[1]}</td>
              <td className="py-2">H {prop[2]}</td>
              <td className="py-2">Active</td>
            </tr>
          ))}
         {/* { <tr>
            <td className="py-2">John Doe</td>
            <td className="py-2">Room 101</td>
            <td className="py-2">Active</td>
          </tr>
          <tr>
            <td className="py-2">Jane Smith</td>
            <td className="py-2">Room 102</td>
            <td className="py-2">Active</td>
          </tr>} */}
          {/* Add more rows as needed */}
        </tbody>
      </table>
    </div>
  );
};

export default StudentsTable;
