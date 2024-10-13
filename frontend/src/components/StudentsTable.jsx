import React from 'react';

const StudentsTable = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-lg font-semibold text-gray-600 mb-4">Students List</h2>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2">Name</th>
            <th className="py-2">Room</th>
            <th className="py-2">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="py-2">John Doe</td>
            <td className="py-2">Room 101</td>
            <td className="py-2">Active</td>
          </tr>
          <tr>
            <td className="py-2">Jane Smith</td>
            <td className="py-2">Room 102</td>
            <td className="py-2">Active</td>
          </tr>
          {/* Add more rows as needed */}
        </tbody>
      </table>
    </div>
  );
};

export default StudentsTable;
