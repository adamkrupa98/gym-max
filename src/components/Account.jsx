import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { sendPasswordResetEmail } from "firebase/auth";
const Account = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const auth = getAuth();
  const [message, setMessage] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const docRef = doc(db, "users", user.uid);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            setUserData(docSnap.data());
          } else {
            console.log("No such document!");
          }
        } catch (error) {
          console.error("Error fetching document: ", error);
        }
      } else {
        setUserData(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [auth]);

  if (loading) {
    return (
      <div className="flex w-full h-screen mt-[-163px] justify-center items-center flex-col">
        <p className="text-2xl text-[#f0a04b]"> Loading...</p>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="flex w-full h-screen mt-[-163px] justify-center items-center flex-col">
        <p className="text-2xl text-[#f0a04b]"> No user data found.</p>
      </div>
    );
  }
  const handlePasswordReset = () => {
    if (auth.currentUser) {
      sendPasswordResetEmail(auth, auth.currentUser.email)
        .then(() => {
          setMessage(
            "Link do zmiany hasła został wysłany na Twój adres e-mail."
          );
        })
        .catch((error) => {
          setMessage("Wystąpił błąd: ", error.message);
        });
    }
  };
  return (
    <div className="flex w-full h-screen mt-[-163px] justify-center items-center flex-col ">
      <div className="mt-[-10%] max-w-[1200px] w-full p-3">
        <div className="text-xl md:text-2xl mb-5 flex">
          <p className="w-1/3 md:w-1/4 font-medium">Imię:</p>{" "}
          <p>{userData.firstname}</p>
        </div>
        <div className="text-xl md:text-2xl mb-5 flex">
          <p className="w-1/3 md:w-1/4 font-medium">Nazwisko:</p>{" "}
          <p>{userData.lastname}</p>
        </div>
        <div className="text-xl md:text-2xl mb-5 flex">
          <p className="w-1/3 md:w-1/4 font-medium">Numer telefonu:</p>{" "}
          <p className=" self-center">{userData.phone}</p>
        </div>
        <div className="text-xl md:text-2xl mb-5 flex">
          <p className="w-1/3 md:w-1/4 font-medium">Email:</p>{" "}
          <p>{userData.email}</p>
        </div>
      </div>
      <div className="flex max-w-[1200px] w-full p-3 justify-center md:justify-normal">
        <button
          type="button"
          className="text-white bg-gradient-to-r from-orange-500 via-orange-600 to-orange-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-orange-300 dark:focus:ring-orange-800 shadow-lg shadow-orange-500/50 dark:shadow-lg dark:shadow-orange-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          onClick={handlePasswordReset}
        >
          Zmień hasło
        </button>
      </div>
      {message && (
        <div className="flex max-w-[1200px] w-full p-3">
          <p className="text-xl text-[#f0a04b]">{message}</p>
        </div>
      )}
    </div>
  );
};

export default Account;
