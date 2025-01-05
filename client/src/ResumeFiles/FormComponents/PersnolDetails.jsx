import React, { useContext } from 'react';
import axios from 'axios';
import { ResumeContext } from '../../context/ResumeContext';

const PersnolDetails = () => {
  const { resumeInfo, setResumeInfo } = useContext(ResumeContext);

  const handeldata = (e) => {
    const { name, value } = e.target;
    setResumeInfo({
      ...resumeInfo,
      [name]: value,
    });
  };
  const sub = (e) => {
    e.preventDefault()
   

  };

  return (
    <div>
      <h2 className="text-xl font-bold text-purple-700 mb-4">Personal Detail</h2>
      <p className="text-gray-600 mb-6">Get Started with the basic information</p>
      <form className="space-y-4" onSubmit={sub}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-600">First Name</label>
            <input
              type="text"
              name="firstName"
              required
              value={resumeInfo?.firstName || ''}
              onChange={handeldata}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div>
            <label className="block text-gray-600">Last Name</label>
            <input
              type="text"
              name="lastName"
              required
              value={resumeInfo?.lastName || ''}
              onChange={handeldata}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
            />
          </div>
        </div>
        <div>
          <label className="block text-gray-600">Job Title</label>
          <input
            type="text"
            name="jobTitle"
            required
            value={resumeInfo?.jobTitle || ''}
            onChange={handeldata}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
          />
        </div>
        <div>
          <label className="block text-gray-600">Address</label>
          <input
            type="text"
            name="address"
            required
            value={resumeInfo?.address || ''}
            onChange={handeldata}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-600">Phone</label>
            <input
              type='number'
              name="phone"
              required
              value={resumeInfo?.phone || ''}
              onChange={handeldata}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div>
            <label className="block text-gray-600">Email</label>
            <input
              type="email"
              name="email"
              required
              value={resumeInfo?.email || ''}
              onChange={handeldata}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
            />
          </div>
        </div>
        {/* <button
          type="submit"
          className="w-full bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600"
        >
          Save
        </button> */}
      </form>
    </div>
  );
};

export default PersnolDetails;
