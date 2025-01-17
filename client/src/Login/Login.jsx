import React, { useState } from 'react';
import axios from 'axios';
import Register from './Register';

const Login = ({ setLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginu, setLoginu] = useState(false); 

  const Regsub = (e) => {
    e.preventDefault();
    axios
      .post('https://jobportal-server-fwl8.onrender.com/login', { email, password })
      .then((res) => {
        if (res.data && res.data._id) {
          // console.log("Login successful", res.data);
          sessionStorage.setItem('userid', res.data._id);
          setLogin(false);
        } else {
          console.log("Login failed: User does not exist or invalid credentials");
        }
      })
      .catch((err) => {
        console.error("Error during login:", err);
      });
  };
  

  return (
    <div className="z-20 bg-transparent text-white font-sans">
      {loginu ? (
        <Register setLoginu={setLoginu} />
      ) : (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div
            className="bg-gray-800 p-8 rounded-lg w-full sm:w-96 transform transition-all duration-500 opacity-0 scale-90 animate-fadeIn"
            style={{ animation: 'fadeIn 0.5s ease-in-out forwards' }}
          >
            <h2 className="text-2xl font-semibold text-center text-blue-500 mb-8">
              Login to Your Account
            </h2>

            <form onSubmit={Regsub}>
              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-300 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full p-3 bg-gray-700 text-white rounded-lg shadow-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="Enter your email"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mb-6">
                <label htmlFor="password" className="block text-gray-300 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  className="w-full p-3 bg-gray-700 text-white rounded-lg shadow-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="Enter your password"
                  required
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <button
                type="submit"
                className="w-full p-3 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-lg hover:bg-gradient-to-l transition-all duration-300"
              >
                Login
              </button>
            </form>

            <div className="mt-4 text-center">
              <button
                onClick={() => setLoginu(true)} // Switch to register form
                className="text-sm text-gray-400 hover:text-gray-300 transition-all duration-300"
              >
                Don't have an account? Register
              </button>
            </div>

            <div className="mt-4 text-center">
              <button
                onClick={() => setLogin(false)} // Close the modal
                className="text-sm text-gray-400 hover:text-gray-300 transition-all duration-300"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
