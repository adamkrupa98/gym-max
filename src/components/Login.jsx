import React, { useState } from "react";
import background from "../assets/background.jpg";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  const notify = () =>
    toast.error("Błędne dane logowania", { autoClose: 2000 });

  const handleSubmit = (x) => {
    x.preventDefault();
    if (email === "test@test.pl" && password === "test123") {
      localStorage.setItem("token", "12444321");
      history.push("/");
    } else {
      notify();
    }
  };

  return (
    <>
      <ToastContainer />
      <form
        onSubmit={handleSubmit}
        className=" w-full h-screen mt-[-96px] flex flex-col mx-auto justify-center items-center bg-cover text-white"
        style={{
          backgroundImage: `url(${background})`,
        }}
      >
        <div className="flex flex-col text-left bg-black border border-slate-400 rounded-md p-8 shadow-lg backdrop-filter backdrop-blur-sm bg-opacity-50">
          <h1 className="text-center font-medium md:text-3xl text-xl">
            Logowanie
          </h1>
          <div className="mt-7 flex flex-col">
            <input
              type="email"
              value={email}
              onChange={(x) => setEmail(x.target.value)}
              className="peer bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:border-[#f0a04b] focus:outline-none focus:ring-0"
              placeholder=""
            />
            <label
              htmlFor=""
              className="absolute translate-y-[-20px] translate-x-[-4px] text-sm duration-300 transform scale-75 -z-10 
            peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-[-2px] peer-placeholder-shown:translate-x-[5px]
            peer-focus:scale-75 peer-focus:translate-y-[-20px] peer-focus:translate-x-[-5px] peer-focus:text-[#f0a04b] "
            >
              Email
            </label>
          </div>
          <div className="mt-7 flex flex-col">
            <input
              type="password"
              value={password}
              onChange={(x) => setPassword(x.target.value)}
              className="peer bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:border-[#f0a04b] focus:outline-none focus:ring-0"
              placeholder=""
            />
            <label
              htmlFor=""
              className="absolute translate-y-[-20px] translate-x-[-4px] text-sm duration-300 transform scale-75 -z-10 
            peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-[-2px] peer-placeholder-shown:translate-x-[5px]
            peer-focus:scale-75 peer-focus:translate-y-[-20px] peer-focus:translate-x-[-5px] peer-focus:text-[#f0a04b] "
            >
              Hasło
            </label>
          </div>
          <div className="flex mt-5">
            <input type="checkbox" className="mr-2" />
            <label htmlFor="">Zapamiętaj</label>
            <Link className="ml-10 underline underline-offset-2 text-blue-400 text-sm">
              Zapomniałeś hasła?
            </Link>
          </div>
          <div className="flex flex-col mt-4 items-center">
            <button className="border-2 rounded-md w-1/2 border-[#f0a04b] font-medium py-1">
              Zaloguj
            </button>
            <div className="flex items-center w-full justify-between mt-4">
              <span className="">Nie masz konta?</span>
              <Link
                to="/register"
                className="text-blue-400 underline underline-offset-2 text-sm"
              >
                Zarejestruj się!
              </Link>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default Login;
