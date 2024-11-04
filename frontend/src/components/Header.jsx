import React from 'react';

const Header = ({userType,userData}) => {
  // const links = userRole === 'admin' 

  const firstname = userData.fname;
  return (
    <header className="flex justify-between items-center p-4 bg-white shadow-md mb-6">
      <h1 className="text-2xl font-bold text-gray-800">{userType} Dashboard</h1>
      <div className="flex items-center space-x-4">
        <span className="text-gray-600">Hello, {firstname}</span>
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGxu1bpsH8F1dpTwMDSlGqJKIs_gabi3T5MQqjLaq-oUevVu7aq9cnd-7o_oj--2zXeAI&usqp=CAU"
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
