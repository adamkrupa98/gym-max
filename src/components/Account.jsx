import React from "react";
import { getAuth } from "firebase/auth";
const Account = () => {
  const auth = getAuth();
  console.log(auth);
  return (
    <div className="flex w-full h-screen mt-[-163px] justify-center items-center flex-col">
      <div className="mt-[-10%] max-w-[1200px] w-full p-3">
        <p className="text-2xl mb-5">Imię:</p>
        <p className="text-2xl mb-5">Naziwsko:</p>
        <p className="text-2xl mb-5">Numer telefonu:</p>
        <p className="text-2xl mb-5">Emai:</p>
      </div>
      <div className="flex max-w-[1200px] w-full p-3">
        <button
          type="button"
          class="text-white bg-gradient-to-r from-orange-500 via-orange-600 to-orange-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-orange-300 dark:focus:ring-orange-800 shadow-lg shadow-orange-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 "
        >
          Zmień hasło
        </button>
      </div>
    </div>
  );
};

export default Account;
