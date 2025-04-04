import React from 'react';
import { Link } from 'react-router-dom';
import image from "../assets/emailImage.jpeg"
const Home = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-blue-600 mb-4">
          Email Automation Pro
        </h1>
        <p className="text-xl text-gray-700">
          Build powerful email sequences with our intuitive flow builder
        </p>
      </div>
      
      <div className="bg-white p-8 rounded-lg shadow-md mb-12">
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Streamline Your Email Outreach
            </h2>
            
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-center">
                <svg className="w-5 h-5 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Create visual email sequences with drag-and-drop simplicity
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Set up wait periods between emails for optimal timing
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Target different lead sources with customized messaging
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Schedule emails to send at the perfect time
              </li>
            </ul>
          </div>
          
          <div>
            <img 
              src={image} 
              alt="Email automation flow diagram" 
              className="rounded-lg shadow-md"
            />
          </div>
        </div>
        
        <div className="mt-8 text-center">
          <Link 
            to="/dashboard" 
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition duration-200"
          >
            Go to Dashboard
          </Link>
        </div>
      </div>
      
      <div className="grid md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="text-blue-500 mb-3">
            <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold mb-2">Save Time</h3>
          <p className="text-gray-600">Automate your follow-ups and never forget to send an important email again.</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="text-blue-500 mb-3">
            <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 20 20">
              <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold mb-2">Personalize at Scale</h3>
          <p className="text-gray-600">Create personalized sequences that feel like one-to-one communication.</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="text-blue-500 mb-3">
            <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zm7-10a1 1 0 01.707.293l.707.707a1 1 0 011.414 0L15 4a1 1 0 010 1.414l-.707.707a1 1 0 01-1.414 0L12 5.414l-.707.707a1 1 0 01-1.414 0L9 5.414a1 1 0 010-1.414l.707-.707A1 1 0 0112 3z" clipRule="evenodd" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold mb-2">Visual Builder</h3>
          <p className="text-gray-600">Design complex email sequences with our intuitive visual builder.</p>
        </div>
      </div>
    </div>
  );
};

export default Home;