
import React from 'react';
import { authService } from '../services/authService';

const Header = ({ onSaveFlow, isSaved, isAuthenticated, onLogout }) => {
  return (
    <div className="bg-gray-800 text-white px-4 py-3 flex justify-between items-center">
      <div>
        <h1 className="text-xl font-bold">Email Automation Flow Builder</h1>
      </div>
      
      <div className="flex items-center space-x-4">
        {isAuthenticated ? (
          <>
            <span className="text-sm">Logged in</span>
            <button
              onClick={onSaveFlow}
              className={`px-4 py-2 rounded font-medium transition focus:outline-none 
                ${isSaved 
                  ? 'bg-green-600 hover:bg-green-700' 
                  : 'bg-blue-600 hover:bg-blue-700'}`}
            >
              {isSaved ? 'Saved Successfully!' : 'Save Flow'}
            </button>
            <button
              onClick={onLogout}
              className="px-4 py-2 rounded font-medium transition focus:outline-none bg-red-600 hover:bg-red-700"
            >
              Logout
            </button>
          </>
        ) : (
          <span className="text-sm text-yellow-300">Please login to save your flow</span>
        )}
      </div>
    </div>
  );
};

export default Header;