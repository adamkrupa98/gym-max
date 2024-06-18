import React, { useState } from "react";
import background from "../assets/registerbackground.jpg";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
const Login = () => {
  const history = useHistory();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
    clearErrors,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const auth = getAuth();
      await signInWithEmailAndPassword(auth, data.email, data.password);
      history.push("/");
    } catch (error) {
      console.error("Błąd logowania ", error);
      setError("password", {
        type: "manual",
        message: "Nieprawidłowy email lub hasło",
      });
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
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
              className="peer bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:border-[#f0a04b] focus:outline-none focus:ring-0"
              placeholder=""
              {...register("email", { required: true })}
            />
            <label
              htmlFor=""
              className="absolute translate-y-[-20px] translate-x-[-4px] text-sm duration-300 transform scale-75 -z-10 
            peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-[-2px] peer-placeholder-shown:translate-x-[5px]
            peer-focus:scale-75 peer-focus:translate-y-[-20px] peer-focus:translate-x-[-5px] peer-focus:text-[#f0a04b] "
            >
              Email
            </label>
            {errors.email && (
              <span className="text-red-500">To pole jest wymagane</span>
            )}
          </div>
          <div className="mt-7 flex flex-col">
            <input
              type="password"
              className="peer bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:border-[#f0a04b] focus:outline-none focus:ring-0"
              placeholder=""
              {...register("password", { required: true })}
            />
            <label
              htmlFor=""
              className="absolute translate-y-[-20px] translate-x-[-4px] text-sm duration-300 transform scale-75 -z-10 
            peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-[-2px] peer-placeholder-shown:translate-x-[5px]
            peer-focus:scale-75 peer-focus:translate-y-[-20px] peer-focus:translate-x-[-5px] peer-focus:text-[#f0a04b] "
            >
              Hasło
            </label>
            {errors.password && !errors.password.message && (
              <span className="text-red-500">To pole jest wymagane</span>
            )}
          </div>
          <div className="flex mt-5">
            <input type="checkbox" className="mr-2" />
            <label htmlFor="">Zapamiętaj</label>
            <Link
              to="/forgotpassword"
              className="ml-10 underline underline-offset-2 text-blue-400 text-sm"
            >
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
            {errors.password && (
              <span className="text-red-500 mt-5">
                Nieprawidłowy email lub hasło
              </span>
            )}
          </div>
        </div>
      </form>
    </>
  );
};

export default Login;
