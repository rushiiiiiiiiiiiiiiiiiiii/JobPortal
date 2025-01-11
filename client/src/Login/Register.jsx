import React, { useState } from 'react';
import axios from 'axios';
import Login from './Login';

const Register = () => {
  const [image, setImage] = useState(null);
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [Loginu, setLoginu] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  const Regsub = (e) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append('image', image);
    formdata.append('name', name);
    formdata.append('type', type);
    formdata.append('email', email);
    formdata.append('password', password);

    axios
      .post('https://job-portal-server-orpin.vercel.app/reg', formdata)
      .then((res) => {
        console.log(res.data);
        setLoginu(true)
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="z-50 text-white font-sans">
      {Loginu ? (
        <Login setLogin={() => setLoginu(false)} />
      ) : (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          {/* Modal with transition */}
          <div
            className="bg-gray-800 p-5 rounded-lg w-full sm:w-96 transform transition-all duration-500 opacity-0 scale-90 animate-fadeIn"
            style={{ animation: 'fadeIn 0.5s ease-in-out forwards' }}
          >
            <h2 className="text-2xl font-semibold text-center text-blue-500 mb-4">
              Register Your Account
            </h2>

            <form onSubmit={Regsub}>
              <div className="flex justify-center mb-4">
                <label
                  htmlFor="file-input"
                  className="cursor-pointer rounded-full border-4 border-blue-500 w-24 h-24 overflow-hidden flex justify-center items-center"
                >
                  <input
                    type="file"
                    id="file-input"
                    name="image"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                  {image ? (
                    <img
                      src={URL.createObjectURL(image)}
                      alt="Profile Preview"
                      className="w-full h-full object-cover rounded-full"
                    />
                  ) : (
                    <span className="text-blue-500 text-2xl">+</span>
                  )}
                </label>
              </div>

              <div className="mb-2">
                <label htmlFor="name" className="block text-gray-300 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full p-3 bg-gray-700 text-white rounded-lg shadow-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="Enter your name"
                  required
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="mb-3">
              <label htmlFor="type" className="block text-gray-300 mb-1">
                  Type
                </label>
              <select
                onChange={(e) => setType(e.target.value)}
                className="w-full p-4 bg-gray-800 rounded-lg shadow-lg text-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-300"
              >
                <option value="">Who you are</option>
                <option value="candidate">Candidate</option>
                <option value="Recruiter">Recruiter</option>

              </select>
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="block text-gray-300 mb-1">
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
              <div className="mb-5">
                <label htmlFor="password" className="block text-gray-300 mb-1">
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
                Register
              </button>
            </form>

            <div className="mt-4 text-center">
              <button
                onClick={() => setLoginu(true)}
                className="text-sm text-gray-400 hover:text-gray-300 transition-all duration-300"
              >
                Already have an account? Log in
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Register;

//   const Regsub = (e) => {
//     e.preventDefault();
//     axios
//       .post('http://localhost:3001/login', {email,password})
//       .then((res) => {
//         if(res.data.length>0){
//             sessionStorage.setItem('userid', res.data[0]._id)
//         }
//         console.log(res.data);

//       })
//       .catch((err) => console.log(err));
//   };
