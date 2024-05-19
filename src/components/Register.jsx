import React, { useState } from "react";
import background from "../assets/registerbackground.jpg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useHistory } from "react-router-dom";

const Register = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmial] = useState("");
  const [number, setNumber] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const history = useHistory();

  const passwordErr = () => {
    return toast.error("Hasła są niezgodne", { autoClose: 2000 });
  };

  const handleSubmit = (x) => {
    x.preventDefault();
    if (password !== password2) {
      passwordErr();
    } else {
      history.push("/");
    }
  };
  return (
    <form
      className="w-full mx-auto h-screen mt-[-96px] flex flex-col justify-center items-center bg-cover text-white"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.5)), url(${background})`,
      }}
      onSubmit={handleSubmit}
    >
      <ToastContainer />
      <div className="flex flex-col border-2 py-5 px-10 border-slate-400 rounded-md backdrop-filter backdrop-blur-md ">
        <h1 className="text-center font-bold text-3xl">Rejestracja</h1>
        <div className="flex flex-col mt-6">
          <input
            type="text"
            className=" peer bg-transparent border-b-2 appearance-none focus:ring-0 focus:outline-none border-gray-300 focus:border-[#f0a04b]"
            placeholder=""
            value={firstname}
            onChange={(x) => setFirstname(x.target.value)}
            required
          />
          <label
            htmlFor=""
            className="absolute z-[-10] duration-300 text-sm translate-y-[-20px] text-slate-300
            peer-focus:text-[#f0a04b] peer-focus:translate-y-[-20px] peer-focus:text-sm
            peer-placeholder-shown:translate-y-[-4px] peer-placeholder-shown:text-lg
            "
          >
            Imię
          </label>
        </div>
        <div className="flex flex-col mt-6">
          <input
            type="text"
            className=" peer bg-transparent border-b-2 appearance-none focus:ring-0 focus:outline-none border-gray-300 focus:border-[#f0a04b]"
            placeholder=""
            value={lastname}
            onChange={(x) => setLastname(x.target.value)}
          />
          <label
            htmlFor=""
            className="absolute z-[-10] duration-300 text-sm translate-y-[-20px] text-slate-300
            peer-focus:text-[#f0a04b] peer-focus:translate-y-[-20px] peer-focus:text-sm
            peer-placeholder-shown:translate-y-[-4px] peer-placeholder-shown:text-lg
            "
          >
            Nazwisko
          </label>
        </div>
        <div className="flex flex-col mt-6">
          <input
            type="text"
            className=" peer bg-transparent border-b-2 appearance-none focus:ring-0 focus:outline-none border-gray-300 focus:border-[#f0a04b]"
            placeholder=""
            value={email}
            onChange={(x) => setEmial(x.target.value)}
            required
          />
          <label
            htmlFor=""
            className="absolute z-[-10] duration-300 text-sm translate-y-[-20px] text-slate-300
            peer-focus:text-[#f0a04b] peer-focus:translate-y-[-20px] peer-focus:text-sm
            peer-placeholder-shown:translate-y-[-4px] peer-placeholder-shown:text-lg
            "
          >
            Adres email
          </label>
        </div>
        <div className="flex flex-col mt-6">
          <input
            type="text"
            className=" peer bg-transparent border-b-2 appearance-none focus:ring-0 focus:outline-none border-gray-300 focus:border-[#f0a04b]"
            placeholder=""
            value={number}
            onChange={(x) => setNumber(x.target.value)}
          />
          <label
            htmlFor=""
            className="absolute z-[-10] duration-300 text-sm translate-y-[-20px] text-slate-300
            peer-focus:text-[#f0a04b] peer-focus:translate-y-[-20px] peer-focus:text-sm
            peer-placeholder-shown:translate-y-[-4px] peer-placeholder-shown:text-lg
            "
          >
            Numer telefonu
          </label>
        </div>
        <div className="flex flex-col mt-6">
          <input
            type="password"
            className=" peer bg-transparent border-b-2 appearance-none focus:ring-0 focus:outline-none border-gray-300 focus:border-[#f0a04b]"
            placeholder=""
            value={password}
            onChange={(x) => setPassword(x.target.value)}
          />
          <label
            htmlFor=""
            className="absolute z-[-10] duration-300 text-sm translate-y-[-20px] text-slate-300
            peer-focus:text-[#f0a04b] peer-focus:translate-y-[-20px] peer-focus:text-sm
            peer-placeholder-shown:translate-y-[-4px] peer-placeholder-shown:text-lg
            "
          >
            Hasło
          </label>
        </div>
        <div className="flex flex-col mt-6">
          <input
            type="password"
            className=" peer bg-transparent border-b-2 appearance-none focus:ring-0 focus:outline-none border-gray-300 focus:border-[#f0a04b]"
            placeholder=""
            value={password2}
            onChange={(x) => setPassword2(x.target.value)}
          />
          <label
            htmlFor=""
            className="absolute z-[-10] duration-300 text-sm translate-y-[-20px] text-slate-300
            peer-focus:text-[#f0a04b] peer-focus:translate-y-[-20px] peer-focus:text-sm
            peer-placeholder-shown:translate-y-[-4px] peer-placeholder-shown:text-lg
            "
          >
            Powtórz hasło
          </label>
        </div>
        <div className="flex flex-col mt-6 border-2 rounded-lg py-1 border-[#f0a04b] font-medium">
          <button>Zarejestruj</button>
        </div>
      </div>
    </form>
  );
};

export default Register;
