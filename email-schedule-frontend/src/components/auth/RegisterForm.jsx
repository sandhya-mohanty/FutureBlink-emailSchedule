// import React, { useState } from 'react';
// import { authService } from '../../services/authService';

// const RegisterForm = ({ onRegisterSuccess }) => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [success, setSuccess] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
    
//     // Validate passwords match
//     if (password !== confirmPassword) {
//       setError('Passwords do not match');
//       return;
//     }
    
//     setLoading(true);

//     try {
//       await authService.register(email, password);
//       setSuccess(true);
//       setLoading(false);
//       if (onRegisterSuccess) onRegisterSuccess();
//     } catch (err) {
//       setError(err.message);
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto">
//       <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
      
//       {error && (
//         <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
//           {error}
//         </div>
//       )}
      
//       {success && (
//         <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
//           Registration successful! You can now login.
//         </div>
//       )}
      
//       <form onSubmit={handleSubmit}>
//         <div className="mb-4">
//           <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
//             Email
//           </label>
//           <input
//             id="email"
//             type="email"
//             className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//         </div>
        
//         <div className="mb-4">
//           <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
//             Password
//           </label>
//           <input
//             id="password"
//             type="password"
//             className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//         </div>
        
//         <div className="mb-6">
//           <label htmlFor="confirmPassword" className="block text-gray-700 text-sm font-bold mb-2">
//             Confirm Password
//           </label>
//           <input
//             id="confirmPassword"
//             type="password"
//             className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//             value={confirmPassword}
//             onChange={(e) => setConfirmPassword(e.target.value)}
//             required
//           />
//         </div>
        
//         <div className="flex items-center justify-between">
//           <button
//             type="submit"
//             className={`bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
//               loading ? 'opacity-50 cursor-not-allowed' : ''
//             }`}
//             disabled={loading}
//           >
//             {loading ? 'Registering...' : 'Register'}
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default RegisterForm;



import React, { useState } from 'react';
import { authService } from '../../services/authService';

const RegisterForm = ({ onRegisterSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);

    try {
      await authService.register(email, password);
      setSuccess(true);
      if (onRegisterSuccess) onRegisterSuccess();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>

      {error && <div className="text-red-600 mb-4">{error}</div>}
      {success && <div className="text-green-600 mb-4">Registration successful!</div>}

      <input
        type="email"
        placeholder="Email"
        className="w-full border p-2 rounded mb-4"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        className="w-full border p-2 rounded mb-4"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Confirm Password"
        className="w-full border p-2 rounded mb-4"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        required
      />

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        disabled={loading}
      >
        {loading ? 'Registering...' : 'Register'}
      </button>
    </form>
  );
};

export default RegisterForm;
