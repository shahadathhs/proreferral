import toast from "react-hot-toast";
import { RxAvatar } from "react-icons/rx";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "./../provider/AuthProvider";
import { useContext } from "react";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const { user, logOut } = useContext(AuthContext);

  const handleSignOut = () => {
    logOut()
      .then(() => {
        toast.success("Logout successful!");
      })
      .catch(() => {
        toast.error("An error happened!");
      });
  };

  const links = (
    <>
      <li>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? "btn btn-sm btn-outline text-orange-500"
              : "btn btn-sm btn-outline"
          }
          to="/index"
        >
          Landing Page
        </NavLink>
      </li>
      <li>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? "btn btn-sm btn-outline text-orange-500"
              : "btn btn-sm btn-outline"
          }
          to="/candidate/home"
        >
          Candidate Home
        </NavLink>
      </li>
    </>
  );

  return (
    <div className="navbar fixed z-50 bg-base-200 h-16">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
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
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 font-bold space-y-1"
          >
            {links}
          </ul>
        </div>
        <Link
          to="/index"
          className="p-0 font-bold normal-case text-2xl"
        >
          <span className="text-orange-500">Pro</span>
          <span className="text-blue-500">Referral</span>
        </Link>
      </div>

      <div className="hidden navbar-center lg:flex">
        <ul className="gap-1 px-1 font-bold  menu menu-horizontal border-1 ">
          {links}
        </ul>
      </div>

      <div className="gap-2 navbar-end">
        {/* Login / LogOut Button */}
        {user ? (
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                {user.photoURL ? (
                  <img src={user?.photoURL} />
                ) : (
                  <div className="flex justify-center py-2 my-auto text-2xl text-orange-500">
                    <RxAvatar />
                  </div>
                )}
              </div>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm space-y-1 dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              {/* profile */}
              <li>
                <button className="text-white bg-orange-500 btn hover:bg-blue-500 btn-ghost">
                  {user.displayName ? (
                    <div>
                      <p>User Name:</p>
                      <p>{user.displayName}</p>
                    </div>
                  ) : (
                    "User name not found"
                  )}
                </button>
              </li>

              {/* logout */}
              <li>
                <button
                  onClick={handleSignOut}
                  className="text-white bg-orange-500 btn btn-sm hover:bg-blue-500 btn-ghost"
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <Link
            to="/login"
            className="text-white bg-orange-500 border-0 btn btn-sm hover:bg-blue-500"
          >
            Login
          </Link>
        )}
        {/* theme toggle */}
        <ThemeToggle />
      </div>
    </div>
  );
}
