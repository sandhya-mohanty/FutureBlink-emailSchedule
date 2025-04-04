// import React, { useState } from 'react';
// import { authService } from '../../services/authService';
// import { useNavigate } from 'react-router-dom';

// const LoginForm = ({ onLoginSuccess }) => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
//     setLoading(true);

//     try {
//       await authService.login(email, password);
//       setLoading(false);
//       if (onLoginSuccess) onLoginSuccess();
//     } catch (err) {
//       setError(err.message);
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto">
//       <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
      
//       {error && (
//         <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
//           {error}
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
        
//         <div className="mb-6">
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
        
//         <div className="flex items-center justify-between">
//           <button
//             type="submit"
//             className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
//               loading ? 'opacity-50 cursor-not-allowed' : ''
//             }`}
//             disabled={loading}
//           >
//             {loading ? 'Logging in...' : 'Login'}
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default LoginForm;






import React, { useState } from 'react';
import { authService } from '../../services/authService';

const LoginForm = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await authService.login(email, password);
      if (onLoginSuccess) onLoginSuccess();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

      {error && <div className="text-red-600 mb-4">{error}</div>}

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

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        disabled={loading}
      >
        {loading ? 'Logging in...' : 'Login'}
      </button>
    </form>
  );
};

export default LoginForm;
