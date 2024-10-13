import React from 'react';

const ComplaintsTable = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-lg font-semibold text-gray-600 mb-4">Complaints</h2>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2">Student Name</th>
            <th className="py-2">Complaint</th>
            <th className="py-2">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="py-2">John Doe</td>
            <td className="py-2">Room AC not working</td>
            <td className="py-2">Pending</td>
          </tr>
          <tr>
            <td className="py-2">Jane Smith</td>
            <td className="py-2">Leaky faucet</td>
            <td className="py-2">Resolved</td>
          </tr>
          {/* Add more rows as needed */}
        </tbody>
      </table>
    </div>
  );
};

export default ComplaintsTable;
