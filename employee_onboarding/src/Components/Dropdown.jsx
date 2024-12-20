import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IoLogOut } from "react-icons/io5";

const Dropdown = ({ name, no_of_options, opt_one, opt_one_link, opt_two, opt_two_link }) => {
    const role = JSON.parse(localStorage.getItem("User_Detial")).role;
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleLogout = () => {
        localStorage.removeItem("User_Detial");
        navigate("/login");
    };

    return (
        <div className="relative inline-block text-left">
            <div>
                <button
                    onClick={toggleDropdown}
                    className="inline-flex justify-center w-full rounded-md border-gray-300 shadow-sm px-4 py-2 text-sm font-medium text-white focus:outline-none"
                >
                    {name}
                    <svg
                        className="ml-2 -mr-1 h-5 w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M19 9l-7 7-7-7"
                        />
                    </svg>
                </button>
            </div>

            {isOpen && (
                <div
                    className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                    role="menu"
                >
                    <div className="py-1" role="none">
                        {opt_one && opt_one_link && role !== 2 && (
                            <Link
                                to={opt_one_link}
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                role="menuitem"
                            >
                                {opt_one}
                            </Link>
                        )}

                        {no_of_options >= 2 && opt_two && opt_two_link && (
                            <Link
                                to={opt_two_link}
                                onClick={handleLogout}
                                className=" px-4 inline-flex items-center gap-1 py-2  text-gray-700 hover:bg-gray-100"
                                role="menuitem"
                            >
                               <IoLogOut size={20} /> {opt_two}
                            </Link>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dropdown;
