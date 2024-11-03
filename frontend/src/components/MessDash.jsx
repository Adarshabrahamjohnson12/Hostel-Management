import React from 'react'

const MessDash = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-lg font-semibold text-gray-600 mb-4">MeshBoard</h2>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2">Meals</th>
            <th className="py-2">Veg/non veg</th>
            <th className="py-2">Addons</th>
          </tr>
        </thead>
        <tbody>
          
          {/* Add more rows as needed */}
        </tbody>
      </table>
    </div>
  )
}

export default MessDash