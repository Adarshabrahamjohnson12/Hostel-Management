import React from 'react';

const Header = () => {
  return (
    <header className="flex justify-between items-center p-4 bg-white shadow-md mb-6">
      <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
      <div className="flex items-center space-x-4">
        <span className="text-gray-600">Hello, Admin</span>
        <img
          src="https://via.placeholder.com/40"
          alt="Admin Avatar"
          className="w-10 h-10 rounded-full border border-gray-200"
        />
        <button 
        onClick={()=>{location.href='/'}} type='sumbit'
         className="text-red-500">Logout</button>
      </div>
    </header>
  );
};

export default Header;
