import React, { useContext, useState, useEffect } from "react";
import { assets } from "../assets/assets";
import { Link, NavLink } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const {
    setShowSearch,
    getCartCount,
    navigate,
    token,
    setToken,
    setCartItems,
    username,
    setUsername,
  } = useContext(ShopContext);

  const logout = () => {
    navigate("/login");
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setToken("");
    setUsername("");
    setCartItems({});
    setVisible(false);
  };

  return (
    <div className="flex items-center justify-between py-5 font-medium">
      {/* logo */}
      <Link to={token ? "/" : "/login"}>
        <img src={assets.logo} className="w-44 sm:w-52" alt="" />
      </Link>

      {/* Middle Nav */}
      {token ? (
        <ul className="hidden sm:flex gap-8 text-md text-gray-700">
          <NavLink to="/" className="flex flex-col items-center gap-1">
            <p>HOME</p>
            <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
          </NavLink>
          <NavLink
            to="/collection"
            className="flex flex-col items-center gap-1"
          >
            <p>COLLECTION</p>
            <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
          </NavLink>
          <NavLink to="/about" className="flex flex-col items-center gap-1">
            <p>ABOUT</p>
            <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
          </NavLink>
          <NavLink to="/contact" className="flex flex-col items-center gap-1">
            <p>CONTACT</p>
            <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
          </NavLink>
        </ul>
      ) : (
        <p className="text-gray-700 text-sm sm:text-base tracking-wide">
          Login or Sign up first.
        </p>
      )}

      {/* Right Nav */}
      {token && (
        <div className="flex items-center gap-8">
          {/* Welcome message if logged in */}
          {token && username && (
            <span className="text-gray-700 border-2 border-black py-2 px-5 hover:text-white hover:bg-black transition-all ease-in-out duration-200 font-medium hidden sm:block">
              Welcome, {username.split(' ')[0]}
            </span>
          )}

          <img
            onClick={() => {
              if (token) {
                setShowSearch(true);
              } else {
                navigate("/login");
              }
            }}
            src={assets.search_icon}
            className="w-6 cursor-pointer"
            alt=""
          />

          {/* User Profile */}
          <div className="group relative">
            <img
              src={assets.profile_icon}
              className="w-6 cursor-pointer"
              alt=""
              onClick={() => setProfileDropdownOpen((open) => !open)}
            />
            {/* Drop down menus */}
            {token && (
              <div
                className={`dropdown-menu absolute right-0 pt-3 ${
                  profileDropdownOpen ? "block" : "hidden"
                } group-hover:block`}
                onMouseLeave={() => setProfileDropdownOpen(false)}
              >
                <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded">
                  <p
                    onClick={() => {
                      setProfileDropdownOpen(false);
                      navigate("/orders");
                    }}
                    className="cursor-pointer hover:text-black"
                  >
                    Orders
                  </p>
                  <p
                    className="cursor-pointer hover:text-black"
                    onClick={() => {
                      setProfileDropdownOpen(false);
                      logout();
                    }}
                  >
                    Logout
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="relative">
            <Link to={"/cart"}>
              <img
                src={assets.cart_icon}
                className="w-6 cursor-pointer min-w-5"
                alt=""
              />
              <p className="absolute bg-black text-center w-4 text-white leading-4 right-[-5px] bottom-[-5px] rounded-full text-[8px]">
                {getCartCount()}
              </p>
            </Link>
          </div>

          {/* Menu icon for mobile, only show if logged in */}
          {token && (
            <img
              src={assets.menu_icon}
              className="w-6 cursor-pointer sm:hidden"
              onClick={() => setVisible(true)}
              alt=""
            />
          )}
        </div>
      )}

      {token && visible && (
        // Sidebar menu for small screen devices
        <div
          className={`absolute z-50 top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${
            visible ? "w-full" : "w-0"
          }`}
        >
          <div className="flex flex-col text-gray-500">
            <div
              onClick={() => setVisible(false)}
              className="flex items-center gap-4 p-3 cursor-pointer"
            >
              <img
                src={assets.dropdown_icon}
                className="h-4 rotate-180"
                alt=""
              />
              <p>Back</p>
            </div>
            <NavLink
              onClick={() => setVisible(false)}
              className="py-4 mt-3 pl-6 border"
              to="/"
            >
              HOME
            </NavLink>
            <NavLink
              onClick={() => setVisible(false)}
              className="py-4 pl-6 border-b"
              to="/collection"
            >
              COLLECTION
            </NavLink>
            <NavLink
              onClick={() => setVisible(false)}
              className="py-4 pl-6 border-b"
              to="/about"
            >
              ABOUT
            </NavLink>
            <NavLink
              onClick={() => setVisible(false)}
              className="py-4 pl-6 border-b"
              to="/contact"
            >
              CONTACT
            </NavLink>
          </div>
          {/* Welcome message if logged in */}
          {token && username && (
            <span className="text-gray-700 absolute bottom-[10%] mb-3 w-full text-center text-lg font-medium sm:hidden block">
              Welcome, {username.split(' ')[0]}
            </span>
          )}
          {token && (
            <p
              className="cursor-pointer text-gray-700 absolute bottom-[8%] w-full text-center font-medium sm:hidden block hover:text-black"
              onClick={logout}
            >
              Logout
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default Navbar;
