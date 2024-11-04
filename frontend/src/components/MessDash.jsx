import React from 'react';

const MeshDash = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-lg font-semibold text-gray-700 mb-4">MeshBoard</h2>
      <table className="min-w-full bg-white">
        <thead>
          <tr className="">
            <th className="py-2 px-4 text-left">Meals</th>
            <th className="py-2 px-4 text-left">Veg/Non Veg</th>
            <th className="py-2 px-4 text-left">Addons</th>
          </tr>
        </thead>
        <tbody>
          {/* Sample data rows */}
          <tr>
            <td className="py-2 px-4  ">Pasta</td>
            <td className="py-2 px-4  ">Veg</td>
            <td className="py-2 px-4  ">Cheese</td>
          </tr>
          <tr>
            <td className="py-2 px-4  ">Chicken Curry</td>
            <td className="py-2 px-4  ">Non Veg</td>
            <td className="py-2 px-4  ">Naan</td>
          </tr>
          {/* Add more rows as needed */}
        </tbody>
      </table>
    </div>
  );
};

export default MeshDash;
