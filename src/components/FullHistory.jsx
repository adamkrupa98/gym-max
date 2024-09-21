import React, { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { db } from "../firebase";
import { useParams } from "react-router-dom";
const FullHistory = () => {
  const [exercise, setExercise] = useState(null);
  const [loading, setLoading] = useState(true);
  const auth = getAuth();
  const { id } = useParams();

  useEffect(() => {
    const fetchExercises = async (userId) => {
      try {
        const exerciseDoc = doc(db, "users", userId, "exercises", id);
        const exerciseSnapshot = await getDoc(exerciseDoc);
        if (exerciseSnapshot.exists()) {
          const data = exerciseSnapshot.data();
          setExercise({
            id: exerciseSnapshot.id,
            ...data,
            timestamp: data.timestamp ? data.timestamp.toDate() : null,
          });
        } else {
          console.error("No such document!");
        }
      } catch (error) {
        console.error("Error fetching exercise:", error.message, error.stack);
      } finally {
        setLoading(false);
      }
    };

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchExercises(user.uid);
      } else {
        console.log("No user is signed in");
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [auth, id]);

  const formatDate = (date) => {
    return date.toLocaleDateString("pl-PL");
  };

  console.log(exercise);
  if (loading) {
    return (
      <div className="flex w-full min-h-screen justify-center items-center flex-col">
        <p className="text-2xl text-[#f0a04b]">Loading...</p>
      </div>
    );
  }

  if (!exercise) {
    return (
      <div className="flex w-full min-h-screen justify-center items-center flex-col">
        <p className="text-2xl text-[#f0a04b]">No exercise found</p>
      </div>
    );
  }

  return (
    <div className="max-w-[800px] mx-auto p-4 md:mt-[8px] ">
      <h1 className="text-2xl mb-2">Pełna historia</h1>
      <div className="h-custom flex flex-col w-full border border-slate-400 rounded-lg p-4 bg-gray-200 bg-opacity-30 backdrop-blur-md shadow-lg hover:shadow-xl transition duration-300 ease-in-out relative z-10 overflow-auto">
        <div className="text-lg">
          {exercise.entries.map((training, index) => {
            return (
              <div
                key={index}
                className="flex items-center justify-between border border-slate-300 rounded-lg p-4 mt-2 bg-slate-400 bg-opacity-60 backdrop-blur-md shadow-lg hover:shadow-xl transition duration-300 ease-in-out relative z-10 overflow-auto max-h-96 hover:bg-slate-100 hover:text-black"
              >
                <div className="overflow-auto w-full">
                  <p className="font-medium">
                    {formatDate(training.date.toDate())}
                  </p>
                  <div className="flex">
                    {training.sets.map((set, i) => {
                      return (
                        <p key={i} className="ml-3">
                          {/*  */}
                          {i + 1 === training.sets.length
                            ? `${set.reps}x${set.weight}kg`
                            : `${set.reps}x${set.weight}kg,`}
                        </p>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default FullHistory;
