import React from 'react'

const Footer = () => {
  return (
    
<div>
      <footer className="bg-gray-800 py-16 mt- ">
        <div className="max-w-6xl mx-auto px-4 sm:px-8 grid grid-cols-1 sm:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Contact Us</h3>
            <p>Email: support@hircd.com</p>
            <p>Phone: +1-234-567-890</p>
            <p>Address: 123 Job Street, Work City, USA</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:underline">About Us</a></li>
              <li><a href="#" className="hover:underline">Privacy Policy</a></li>
              <li><a href="#" className="hover:underline">Terms & Conditions</a></li>
              <li><a href="#" className="hover:underline">FAQs</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Follow Us</h3>
            <div className="flex space-x-4 text-white">
              <a href="#" className="hover:text-blue-500">Facebook</a>
              <a href="#" className="hover:text-blue-500">Twitter</a>
              <a href="#" className="hover:text-blue-500">LinkedIn</a>
              <a href="#" className="hover:text-blue-500">Instagram</a>
            </div>
          </div>
        </div>
        <div className="text-center text-sm text-gray-600 mt-8">
          © 2024 Hircd. All rights reserved.
        </div>
      </footer>
      </div>
  )
}

export default Footer
