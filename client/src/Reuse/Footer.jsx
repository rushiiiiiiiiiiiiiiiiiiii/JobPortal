import React from 'react';

const Footer = () => {
  return (
    <div>
      <footer className="bg-gray-900 py-16 mt-16 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-8 grid grid-cols-1 sm:grid-cols-3 gap-8">
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-white mb-4">Contact Us</h3>
            <p className="text-gray-400">Email: support@hircd.com</p>
            <p className="text-gray-400">Phone: +1-234-567-890</p>
            <p className="text-gray-400">Address: 123 Job Street, Work City, USA</p>
          </div>
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-blue-500 transition duration-300">About Us</a></li>
              <li><a href="#" className="text-gray-400 hover:text-blue-500 transition duration-300">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-400 hover:text-blue-500 transition duration-300">Terms & Conditions</a></li>
              <li><a href="#" className="text-gray-400 hover:text-blue-500 transition duration-300">FAQs</a></li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-white mb-4">Follow Us</h3>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-blue-500 transition duration-300">Facebook</a>
              <a href="#" className="text-gray-400 hover:text-blue-500 transition duration-300">Twitter</a>
              <a href="#" className="text-gray-400 hover:text-blue-500 transition duration-300">LinkedIn</a>
              <a href="#" className="text-gray-400 hover:text-blue-500 transition duration-300">Instagram</a>
            </div>
          </div>
        </div>
        <div className="text-center text-sm text-gray-500 mt-12">
          <p>© 2024 Hircd. All rights reserved.</p>
          <p className="text-gray-400 mt-2">Created with ❤️ for your career journey by<br/> Rushikesh Arote.</p>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
