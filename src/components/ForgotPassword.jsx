import React from "react";
import { useForm } from "react-hook-form";
import background from "../assets/registerbackground.jpg";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { useHistory } from "react-router-dom";
const ForgotPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm();

  const history = useHistory();

  const onSubmit = async (data) => {
    try {
      const auth = getAuth();
      await sendPasswordResetEmail(auth, data.email);
      history.push("/login");
    } catch (error) {
      console.error("Błąd odzyskiwania hasła: ", error);
      alert("Wystąpił problem podczas wysyłania emaila.");
    }
  };
  return (
    <form
      className="w-full mx-auto h-screen mt-[-96px] flex flex-col justify-center items-center bg-cover text-white"
      style={{
        backgroundImage: `url(${background})`,
      }}
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="w-[25%] flex flex-col border-2 py-5 px-10 border-slate-400 rounded-md backdrop-filter backdrop-blur-md">
        <h1 className="text-center font-bold text-3xl mt-10">
          Odzyskiwanie hasła
        </h1>
        <div className="flex flex-col mt-[20%]">
          <input
            type="text"
            className=" peer bg-transparent border-b-2 appearance-none focus:ring-0 focus:outline-none border-gray-300 focus:border-[#f0a04b]"
            placeholder=""
            {...register("email", {
              required: true,
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Niepoprawny format adresu email",
              },
            })}
          />
          <label
            htmlFor=""
            className="absolute z-[-10] duration-300 text-sm translate-y-[-20px] border-gray-300 peer-focus:translate-y-[-20px] peer-focus:text-sm peer-focus:text-[#f0a04b]
            peer-placeholder-shown:translate-y-[-4px] peer-placeholder-shown:text-lg
            "
          >
            Email
          </label>
          {errors.email && (
            <span className="text-red-500">{errors.email.message}</span>
          )}
        </div>
        <div className="flex flex-col mt-6 border-2 rounded-lg py-1 border-[#f0a04b] font-medium">
          <button type="submit">Resetuj</button>
        </div>
      </div>
    </form>
  );
};

export default ForgotPassword;
