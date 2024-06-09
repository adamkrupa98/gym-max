import { Link } from "react-router-dom";
import { IoIosMenu } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom";
const Navbar = () => {
  const [nav, setNav] = useState(true);
  const location = useLocation();
  const [islogged, setIslogged] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const history = useHistory();
  const settingsRef = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIslogged(!!token);
  }, [location]);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleClick = () => {
    setNav(!nav);
  };

  const handleClickOutside = (event) => {
    if (settingsRef.current && !settingsRef.current.contains(event.target)) {
      setShowSettings(false);
    }
  };

  const handleSettings = () => {
    setShowSettings(!showSettings);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    history.push("/");
    window.location.reload();
  };

  const isLoginPage =
    location.pathname === "/login" || location.pathname === "/register";

  return (
    <nav className="text-[#f0a04b] flex max-w-[1240px] mx-auto px-4 items-center h-24 justify-between">
      <Link to="/">
        <h1 className="text-[#f0a04b] text-3xl md:text-4xl font-bold">
          GymMax
        </h1>
      </Link>
      {!isLoginPage && (
        <>
          {islogged && (
            <>
              <ul className="md:text-2xl hidden md:flex justify-between">
                <li className="p-4">
                  <Link to="/exercises">Rekordy</Link>
                </li>
                <li className="p-4">
                  <button onClick={handleSettings}>Moje konto</button>
                </li>
                {showSettings && (
                  <div
                    ref={settingsRef}
                    className="absolute top-20 p-2 translate-x-[140px] text-sm w-auto border-2 border-gray-600 rounded-md text-black"
                  >
                    <ul className="flex px-3 justify-center w-full flex-col text-center">
                      <li className="p-1">
                        <Link to="/settings">Ustawienia</Link>
                      </li>
                      <li className="p-1">
                        <button onClick={handleLogout}>Wyloguj się</button>
                      </li>
                    </ul>
                  </div>
                )}
              </ul>
            </>
          )}
          {!islogged && (
            <ul className="md:text-2xl hidden md:flex justify-between">
              <li className="p-4">
                <Link to="/login">Zaloguj się</Link>
              </li>
            </ul>
          )}
        </>
      )}
      {!isLoginPage && (
        <div className="sm:hidden" onClick={handleClick}>
          {nav ? <IoIosMenu size={30} /> : <IoClose size={30} />}
        </div>
      )}
      <div
        className={
          !nav
            ? "fixed top-0 left-0 bg-[#e18f36] w-[70%] h-full ease-in-out duration-300 text-white"
            : "fixed left-[-100%]"
        }
        onClick={handleClickOutside}
      >
        <Link to="/" onClick={handleClick}>
          <h1 className=" text-3xl md:text-4xl font-bold p-4 mt-3">GymMax</h1>
        </Link>
        {islogged && (
          <ul className="md:text-2xl md:flex justify-between">
            <li className="p-4">
              <Link to="/exercises" onClick={handleClick}>
                Rekordy
              </Link>
            </li>
            <li className="p-4">
              <Link to="/settings" onClick={handleClick}>
                Ustawienia konta
              </Link>
            </li>
            <li className="p-4">
              <button onClick={handleLogout}>Wyloguj się</button>
            </li>
          </ul>
        )}
        {!islogged && (
          <ul className="md:text-2xl md:flex justify-between">
            <li className="p-4">
              <Link to="/login" onClick={handleClick}>
                Zaloguj się
              </Link>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
