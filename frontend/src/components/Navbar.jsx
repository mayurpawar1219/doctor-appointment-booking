import React, { useState, useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { assets } from '../assets/assets';

const Navbar = () => {
  const navigate = useNavigate();
  const { token, setToken ,userData} = useContext(AppContext);
  const [showMenu, setShowMenu] = useState(false);

  const logout = () => {
    setToken('');
    localStorage.removeItem('token');
  };

  return (
    <div className="flex items-center justify-between text-sm py-4 mb-5 border-b border-b-gray-300">
      {/* Logo */}
      <img
        onClick={() => navigate('/')}
        className="w-44 cursor-pointer"
        src={assets.logo}
        alt="Logo"
      />

      {/* Navigation Links */}
      <ul className="hidden md:flex md:gap-6 lg:gap-10 font-semibold cursor-pointer">
        {['/', '/doctors', '/about', '/contact'].map((path, idx) => (
          <li key={idx} className="relative">
            <NavLink
              to={path}
              className={({ isActive }) => (isActive ? 'text-primary' : '')}
            >
              {path === '/' ? 'HOME' : path.replace('/', '').toUpperCase()}
            </NavLink>
            <NavLink to={path} end>
              {({ isActive }) =>
                isActive && (
                  <hr className="absolute left-0 right-0 bottom-[-4px] border-none outline-none h-0.5 bg-[#5f6FFF] w-3/5 m-auto" />
                )
              }
            </NavLink>
          </li>
        ))}
      </ul>

      {/* Create Account / Profile */}
      <div className="flex items-center gap-4">
        {token && userData ? (
          <div
            className="flex items-center gap-3 border border-gray-300 px-4 py-2 rounded-full cursor-pointer relative"
            onClick={() => setShowMenu((prev) => !prev)}
          >
            <img className="w-8 rounded-full" src={userData.image} alt="" />
            <img className="w-2.5" src={assets.dropdown_icon} alt="" />

            {showMenu && (
              <div className="absolute top-12 right-0 bg-white shadow-lg rounded-lg py-3 px-5 flex flex-col gap-3 w-40">
                <p
                  onClick={() => navigate('my-profile')}
                  className="hover:text-black cursor-pointer"
                >
                  My Profile
                </p>
                <p
                  onClick={() => navigate('my-appointments')}
                  className="hover:text-black cursor-pointer"
                >
                  My Appointments
                </p>
                <p onClick={logout} className="hover:text-black cursor-pointer">
                  Logout
                </p>
              </div>
            )}
          </div>
        ) : (
          <button
            onClick={() => navigate('/login')}
            className="bg-[#5f6FFF] text-white px-8 py-3 rounded-full font-light hidden md:block"
          >
            Create Account
          </button>
        )}

        {/* Mobile Menu */}
        <img
          onClick={() => setShowMenu(true)}
          className="w-6 md:hidden"
          src={assets.menu_icon}
          alt=""
        />

        <div
          className={`${
            showMenu ? 'fixed w-full' : 'h-0 w-0'
          } md:hidden right-0 top-0 bottom-0 z-20 overflow-hidden bg-white transition-all`}
        >
          <div className="flex items-center justify-between px-5 py-6">
            <img className="w-36" src={assets.logo} alt="" />
            <img
              className="w-7"
              onClick={() => setShowMenu(false)}
              src={assets.cross_icon}
              alt=""
            />
          </div>

          <ul className="flex flex-col items-center gap-2 mt-5 px-5 text-lg font-medium">
            <NavLink onClick={() => setShowMenu(false)} to="/">
              <p className="px-4 py-2 rounded inline-block">Home</p>
            </NavLink>
            <NavLink onClick={() => setShowMenu(false)} to="/doctors">
              <p className="px-4 py-2 rounded inline-block">All Doctors</p>
            </NavLink>
            <NavLink onClick={() => setShowMenu(false)} to="/about">
              <p className="px-4 py-2 rounded inline-block">About</p>
            </NavLink>
            <NavLink onClick={() => setShowMenu(false)} to="/contact">
              <p className="px-4 py-2 rounded inline-block">Contact</p>
            </NavLink>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
