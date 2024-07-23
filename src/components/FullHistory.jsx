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
        console.log("Fetching exercise for user:", userId);
        console.log(id);
        const exerciseDoc = doc(db, "users", userId, "exercises", id);
        console.log("Exercise doc reference:", exerciseDoc.path);
        const exerciseSnapshot = await getDoc(exerciseDoc);
        console.log("Exercise snapshot:", exerciseSnapshot);
        if (exerciseSnapshot.exists()) {
          const data = exerciseSnapshot.data();
          console.log("Exercise data:", data);
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
    <div className="max-w-[800px] mx-auto p-4 mt-10">
      <div className="h-custom flex flex-col justify-center items-center w-full border border-slate-400 rounded-lg p-4 bg-gray-200 bg-opacity-30 backdrop-blur-md shadow-lg hover:shadow-xl transition duration-300 ease-in-out relative z-10 overflow-auto">
        <h1 className="text-2xl font-bold mb-4">Historia Ćwiczenia</h1>
        <div className="text-lg">
          <p>ID: {exercise.id}</p>
          <p>Nazwa: {exercise.exercise}</p>
          <p>
            Data:{" "}
            {exercise.timestamp
              ? exercise.timestamp.toLocaleDateString()
              : "Brak daty"}
          </p>
          <p>Wynik: {exercise.score}</p>
          {/* Dodaj inne szczegóły ćwiczenia, jeśli istnieją */}
        </div>
      </div>
    </div>
  );
};

export default FullHistory;
