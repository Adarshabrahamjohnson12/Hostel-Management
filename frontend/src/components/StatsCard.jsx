import React from 'react';

const StatsCard = ({ title, count }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-lg font-semibold text-gray-600">{title}</h2>
      <p className="text-3xl font-bold text-gray-800 mt-2">{count}</p>
    </div>
  );
};

export default StatsCard;
