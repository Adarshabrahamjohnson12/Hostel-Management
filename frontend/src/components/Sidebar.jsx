import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = ({ userRole }) => {
  const links = userRole === 'admin' ? [
    { name: 'Dashboard', path: '/admin' },
    { name: 'Manage Rooms', path: '/admin/rooms' },
    { name: 'Add Students', path: '/admin/students' },
    { name: 'Reports', path: '/admin/reports' },
    // { name: 'Add Student', path: '/admin/Addstudents'}
  ] : [
    { name: 'Dashboard', path: '/student/:id' },
    { name: 'My Room', path: '/student/room' },
    { name: 'Profile', path: '/student/profile' },
    { name: 'Complaints', path: '/student/complaints' },
  ];

  return (
    <div className="lg:w-64 lg:fixed bg-gray-800 text-white lg:h-screen p-5">
      <h1 className="text-2xl font-bold mb-12">Hostel Management</h1>
      <ul>
        {links.map((link) => (
          <li key={link.name} className="mb-4">
            <Link to={link.path} className="text-lg hover:text-gray-300">
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
