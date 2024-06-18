import background from "../assets/registerbackground.jpg";
import "react-toastify/dist/ReactToastify.css";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";
const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  const history = useHistory();
  const auth = getAuth();
  const onSubmit = async (data) => {
    if (data.password !== data.repeatPassword) {
      setError("repeatPassword", {
        type: "manual",
        message: "Hasła się nie zgadzają",
      });
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        firstname: data.firstname,
        lastname: data.lastname,
        email: data.email,
        phone: data.phone,
      });

      history.push("/");
    } catch (error) {
      console.log("Blad poczas rejestracji uzytkownika", error);
    }
  };
  return (
    <form
      className="w-full mx-auto h-screen mt-[-96px] flex flex-col justify-center items-center bg-cover text-white"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.5)), url(${background})`,
      }}
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="w-[25%] flex flex-col border-2 py-5 px-10 border-slate-400 rounded-md backdrop-filter backdrop-blur-md ">
        <h1 className="text-center font-bold text-3xl mt-10">Rejestracja</h1>
        <div className="flex flex-col mt-[20%]">
          <input
            type="text"
            className=" peer bg-transparent border-b-2 appearance-none focus:ring-0 focus:outline-none border-gray-300 focus:border-[#f0a04b]"
            placeholder=""
            {...register("firstname", { required: true })}
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
          {errors.firstname && (
            <span className="text-red-500">To pole jest wymagane</span>
          )}
        </div>
        <div className="flex flex-col mt-6">
          <input
            type="text"
            className=" peer bg-transparent border-b-2 appearance-none focus:ring-0 focus:outline-none border-gray-300 focus:border-[#f0a04b]"
            placeholder=""
            {...register("lastname", { required: true })}
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
          {errors.lastname && (
            <span className="text-red-500">To pole jets wymagane</span>
          )}
        </div>
        <div className="flex flex-col mt-6">
          <input
            type="text"
            className=" peer bg-transparent border-b-2 appearance-none focus:ring-0 focus:outline-none border-gray-300 focus:border-[#f0a04b]"
            placeholder=""
            {...register("email", {
              required: true,
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Niepoprawny format adresu email",
              },
            })}
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
          {errors.email && (
            <span className="text-red-500">
              {errors.email.message || "To pole jest wymagane"}
            </span>
          )}
        </div>
        <div className="flex flex-col mt-6">
          <input
            type="text"
            className=" peer bg-transparent border-b-2 appearance-none focus:ring-0 focus:outline-none border-gray-300 focus:border-[#f0a04b]"
            placeholder=""
            {...register("phone", {
              required: true,
              pattern: {
                value: /^[0-9]+$/,
                message: "Numer telefonu może zawierać tylko cyfry",
              },
            })}
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
          {errors.phone && (
            <span className="text-red-500">
              {errors.phone.message || "To pole jest wymagane"}
            </span>
          )}
        </div>
        <div className="flex flex-col mt-6">
          <input
            type="password"
            className=" peer bg-transparent border-b-2 appearance-none focus:ring-0 focus:outline-none border-gray-300 focus:border-[#f0a04b]"
            placeholder=""
            {...register("password", { required: true })}
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
          {errors.password &&
            !errors.password.message(
              <span className="text-red-500">To pole jest wymagane</span>
            )}
        </div>
        <div className="flex flex-col mt-6">
          <input
            type="password"
            className=" peer bg-transparent border-b-2 appearance-none focus:ring-0 focus:outline-none border-gray-300 focus:border-[#f0a04b]"
            placeholder=""
            {...register("repeatPassword", { required: true })}
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
          {errors.repeatPassword && (
            <span className="text-red-500">
              {errors.repeatPassword.message || "To pole jest wymagane!"}
            </span>
          )}
        </div>
        <div className="flex flex-col mt-6 border-2 rounded-lg py-1 border-[#f0a04b] font-medium">
          <button type="submit">Zarejestruj</button>
        </div>
      </div>
    </form>
  );
};

export default Register;
