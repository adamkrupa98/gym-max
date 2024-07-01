import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import ExcerciseBox from "./ExcerciseBox";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { db } from "../firebase";
import { collection, query, getDocs } from "firebase/firestore";

const Exercises = () => {
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(true);
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
            timestamp: data.timestamp.toDate(), // Konwersja Timestamp do Date
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
      <div className="flex w-full h-screen mt-[-163px] justify-center items-center flex-col">
        <p className="text-2xl text-[#f0a04b]"> Loading...</p>
      </div>
    );
  }

  const containerClass = exercises.length <= 3 ? "h-screen" : "h-auto";

  return (
    <div
      className={`max-w-[1240px] w-full flex flex-col items-center ${containerClass} mt-[-163px] mx-auto`}
    >
      <h1 className="mt-[170px] font-bold text-3xl md:text-4xl lg:text-5xl">
        Zapisane ćwiczenia: {exercises.length > 0 ? exercises.length : ""}
      </h1>
      <Link
        id="add_new"
        to="/create"
        className="mt-10 bg-white border-[#f0a04b] border-2 rounded-md p-2 font-medium text-[#f0a04b] w-40 text-center hover:text-white hover:bg-[#f0a04b]"
      >
        + Dodaj nowe
      </Link>

      <div
        className={`grid md:grid-cols-3 w-full max-w-[1240px] h-auto text-center mt-14 pb-10 items-center`}
      >
        {exercises.map((x, index) => (
          <ExcerciseBox
            key={index}
            exerciseId={x.id}
            max={x.score}
            date={x.timestamp}
            exercise={x.exercise}
          />
        ))}
      </div>
    </div>
  );
};

export default Exercises;
