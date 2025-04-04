import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navigation = () => {
  const location = useLocation();

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-6 py-3">
        <div className="flex justify-between items-center">
          <div className="text-xl font-semibold text-blue-600">
            <Link to="/">Email Automation Pro</Link>
          </div>

          <div className="flex space-x-4">
            <Link
              to="/"
              className={`py-2 px-4 font-bold text-lg ${
                location.pathname === '/' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-700 hover:text-blue-600'
              }`}
            >
              Home
            </Link>
            <Link
              to="/dashboard"
              className={`py-2 px-4 font-bold text-lg ${
                location.pathname === '/dashboard' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-700 hover:text-blue-600'
              }`}
            >
              Dashboard
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
