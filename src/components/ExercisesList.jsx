import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import ExcerciseBox from "./ExcerciseBox";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { db } from "../firebase";
import { collection, query, getDocs } from "firebase/firestore";

const Exercises = () => {
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const auth = getAuth();

  useEffect(() => {
    const fetchExercises = async (userId) => {
      try {
        const q = query(collection(db, "users", userId, "exercises"));
        const querySnapshot = await getDocs(q);
        const exercisesData = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            ...data,
            timestamp: data.timestamp.toDate(),
          };
        });
        setExercises(exercisesData);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchExercises(user.uid);
      } else {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [auth]);

  if (loading) {
    return (
      <div className="flex w-full min-h-screen justify-center items-center flex-col">
        <p className="text-2xl text-[#f0a04b]">Loading...</p>
      </div>
    );
  }

  const autoSelect = (event) => {
    setSearchTerm(event.target.value);
  };

  const filterExercises = exercises.filter((exercise) =>
    exercise.exercise.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-[1240px] w-full flex flex-col min-h-screen h-auto mx-auto mt-[-155px]">
      <div className="mt-[155px]">
        <h1 className="md:mt-16 p-3 font-bold text-xl md:text-xl lg:text-xl">
          Zapisane ćwiczenia: {exercises.length > 0 ? exercises.length : ""}
        </h1>
        <div className="flex w-full mt- p-3 items-center">
          <input
            type="text"
            id="first_name"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block md:w-[15%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 h-10"
            placeholder="Szukaj..."
            required
            onChange={autoSelect}
          />
          <Link
            id="add_new"
            to="/create"
            className="bg-white border-[#f0a04b] border-2 rounded-md p-2 font-medium text-[#f0a04b] w-40 text-center hover:text-white hover:bg-[#f0a04b] ml-5"
          >
            + Dodaj nowe
          </Link>
        </div>
        <div>
          <ul className="flex flex-col w-full max-w-[1240px] mt-5 pb-10 p-3">
            {filterExercises.map((x, index) => (
              <ExcerciseBox
                key={index}
                exerciseId={x.id}
                max={x.score}
                date={x.timestamp}
                exercise={x.exercise}
              />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Exercises;
