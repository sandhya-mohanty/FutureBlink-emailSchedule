import React, { useState } from 'react';
import LoginForm from '../components/auth/LoginForm';
import RegisterForm from '../components/auth/RegisterForm';

const AuthPage = ({ onAuthSuccess }) => {
  const [activeTab, setActiveTab] = useState('login');

  const handleLoginSuccess = () => {
    if (onAuthSuccess) onAuthSuccess();
  };

  const handleRegisterSuccess = () => {
    setActiveTab('login');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h1 className="text-center text-3xl font-extrabold text-gray-900 mb-6">
          Email Automation Flow
        </h1>
        
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="flex border-b mb-4">
            <button
              className={`py-2 px-4 font-medium text-sm ${
                activeTab === 'login'
                  ? 'border-b-2 border-blue-500 text-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('login')}
            >
              Login
            </button>
            <button
              className={`py-2 px-4 font-medium text-sm ${
                activeTab === 'register'
                  ? 'border-b-2 border-blue-500 text-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('register')}
            >
              Register
            </button>
          </div>
          
          {activeTab === 'login' ? (
            <LoginForm onLoginSuccess={handleLoginSuccess} />
          ) : (
            <RegisterForm onRegisterSuccess={handleRegisterSuccess} />
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthPage;