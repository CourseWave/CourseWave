// LoginPage.jsx
import React, { useState } from 'react';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // You can implement authentication logic here
    console.log(`Logging in with email: ${email} and password: ${password}`);
    // For a real application, you would typically make an API call to authenticate the user.
  };

  return (
    <div className="flex h-screen justify-center items-center">
      <div className="bg-gray-100 p-6 rounded-md shadow-md">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <form>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="border rounded-md px-3 py-2 w-full"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="border rounded-md px-3 py-2 w-full"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="button"
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
            onClick={handleLogin}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
