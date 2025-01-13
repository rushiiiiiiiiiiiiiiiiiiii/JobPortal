import React, { useState, useEffect } from 'react';
import Login from '../Login/Login';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaBell } from 'react-icons/fa';

const Nav = () => {
    const [login, setLogin] = useState(false);
    const [userdata, setUserdata] = useState(null);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const id = sessionStorage.getItem('userid');
    const isLoggedIn = Boolean(id);

    const addlogin = () => {
        setLogin(true);
    };

    const toggleDropdown = () => {
        setDropdownOpen((prevState) => !prevState);
    };

    const handleLogout = () => {
        sessionStorage.removeItem('userid');
        window.location.reload();
    };

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (
                !event.target.closest('.dropdown') &&
                !event.target.closest('.dropdown-toggle')
            ) {
                setDropdownOpen(false);
            }
        };

        if (dropdownOpen) {
            document.addEventListener('click', handleOutsideClick);
        }

        return () => {
            document.removeEventListener('click', handleOutsideClick);
        };
    }, [dropdownOpen]);

    useEffect(() => {
        if (id) {
            axios
                .get(`https://job-portal-server-orpin.vercel.app/getuser/${id}`)
                .then((res) => setUserdata(res.data))
                .catch((err) => console.error(err));
        }
    }, [id]);

    return (
        <div className="bg-gray-900 shadow-lg text-white font-sans relative">
            {login && <Login setLogin={setLogin} />}

            {/* Logo */}
            <div className="absolute top-5 left-4 sm:left-8 flex items-center">
                <img
                    src='../public/image/logo.png'
                    alt="Hircd Logo"
                    className="h-8 sm:h-10"
                />
            </div>

            {/* Notification Icon */}
            <Link to="/chatsearch">
                <div className="absolute top-7 right-16 sm:right-28 text-xl sm:text-2xl cursor-pointer">
                    <FaBell />
                </div>
            </Link>

            {/* Generate Resume Button */}
            <div className="absolute top-5 right-32 sm:right-44">
                <Link to="/start">
                    <button className="flex bg-gray-600 text-white px-3 sm:px-4 py-2 rounded-lg font-medium shadow-lg hover:bg-gray-100 hover:text-black transition duration-200 text-xs sm:text-sm lg:text-base">
                        ✨ Generate Resume
                    </button>
                </Link>
            </div>

            {/* Login/Dropdown */}
            {isLoggedIn ? (
                <div className="absolute top-5 right-4 sm:right-8 dropdown">
                    <img
                        src={
                            userdata && userdata.image
                                ? `https://job-portal-server-orpin.vercel.app/${userdata.image}`
                                : './public/image/default-profile.png'
                        }
                        alt="Profile"
                        className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-gray-500 cursor-pointer dropdown-toggle"
                        onClick={toggleDropdown}
                    />
                    {dropdownOpen && (
                        <div className="absolute top-14 right-0 sm:right-10 bg-gray-800 text-white rounded-lg shadow-xl p-4 w-56 sm:w-64 z-50">
                            {userdata ? (
                                <div className="flex items-center mb-4">
                                    <img
                                        src={`https://job-portal-server-orpin.vercel.app/${userdata.image}`}
                                        alt="Profile"
                                        className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-gray-700 mr-3"
                                    />
                                    <div>
                                        <p className="font-bold text-base sm:text-lg">{userdata.name}</p>
                                        <p className="text-sm text-gray-400">{userdata.email}</p>
                                        <p className="text-sm text-gray-400">{userdata.type}</p>
                                    </div>
                                </div>
                            ) : (
                                <p className="text-sm text-gray-400">No user data available</p>
                            )}
                            <div className="border-b border-gray-700 my-2"></div>
                            <ul className="space-y-2">
                                <Link to="/myjob">
                                    <li className="py-2 px-3 rounded-lg hover:bg-gray-700 cursor-pointer">
                                        <span>My Jobs</span>
                                    </li>
                                </Link>
                                <Link to="/savejob">
                                    <li className="py-2 px-3 rounded-lg hover:bg-gray-700 cursor-pointer">
                                        <span>Saved Jobs</span>
                                    </li>
                                </Link>
                                <li className="py-2 px-3 rounded-lg hover:bg-gray-700 cursor-pointer">
                                    <span>Manage Account</span>
                                </li>
                                <li
                                    className="py-2 px-3 rounded-lg hover:bg-gray-700 cursor-pointer text-red-500"
                                    onClick={handleLogout}
                                >
                                    <span>Logout</span>
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
            ) : (
                <button
                    onClick={addlogin}
                    className="absolute top-5 right-5 bg-transparent border border-gray-500 px-2 sm:px-4 py-1 sm:py-2 rounded hover:bg-gray-700 text-sm sm:text-base text-white"
                >
                    Login
                </button>
            )}
        </div>
    );
};

export default Nav;
