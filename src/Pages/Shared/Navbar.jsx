import React, { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);

  const handleLogOut = () => {
    logOut()
      .then()
      .catch((err) => {
        console.log(err);
      });
  };

  const navOps = (
    <>
      <li>
        <a>Item 1</a>
      </li>
      <li>
        <a>Parent</a>
      </li>
      <li>
        <Link to={"/repositories"}>Repository List</Link>
      </li>
    </>
  );
  return (
    <div>
      <div className="navbar lg:bg-black  z-10 max-w-screen-xl lg:text-white b">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >{navOps}</ul>
          </div>
          <a className="btn btn-ghost text-xl">PicaRes</a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            {navOps}
          </ul>
        </div>
        <div className="navbar-end">
        {user?.email ? (
            <Link to="/">
              <a
                onClick={handleLogOut}
                className="btn bg-gradient-to-r from-[#8c3e91] to-[#3a3b79] text-white
                      hover:from-[#3a3b79] hover:to-[#8c3e91] transition-all duration-300 shadow-xl rounded-md">
                Logout
              </a>
            </Link>
          ) : (
            <Link to="/login">
            <a
              className="btn bg-gradient-to-r from-[#8c3e91] to-[#3a3b79] text-white
                            hover:from-[#3a3b79] hover:to-[#8c3e91] rounded-md transition-all duration-300"
            >
              Login
            </a>
          </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
