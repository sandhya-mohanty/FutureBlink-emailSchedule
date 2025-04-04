import React from 'react';
import EmailAutomationFlow from '../components/EmailAutomationFlow';

const Dashboard = () => {
  return (
    <div className="h-full">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Email Automation Dashboard</h1>
      <div className="bg-white rounded-lg shadow-md h-[calc(100vh-220px)] min-h-[600px]">
        <EmailAutomationFlow />
      </div>
    </div>
  );
};

export default Dashboard;