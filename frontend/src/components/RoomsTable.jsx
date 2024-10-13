import React from 'react';

const RoomsTable = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-lg font-semibold text-gray-600 mb-4">Rooms Status</h2>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2">Room Number</th>
            <th className="py-2">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="py-2">101</td>
            <td className="py-2">Occupied</td>
          </tr>
          <tr>
            <td className="py-2">102</td>
            <td className="py-2">Available</td>
          </tr>
          {/* Add more rows as needed */}
        </tbody>
      </table>
    </div>
  );
};

export default RoomsTable;
