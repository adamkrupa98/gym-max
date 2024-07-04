import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

const ExerciseDetails = () => {
  const { id } = useParams();
  const [exercise, setExercise] = useState(null);
  const [loading, setLoading] = useState(true);
  const auth = getAuth();
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
            timestamp: data.timestamp.toDate(), // Konwersja Timestamp do Date
          });
        } else {
          console.error("No such document!");
        }
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
  }, [auth, id]);

  console.log(exercise);
  if (loading) {
    return (
      <div className="flex w-full min-h-screen justify-center items-center flex-col">
        <p className="text-2xl text-[#f0a04b]">Loading...</p>
      </div>
    );
  }
  return (
    <div className="flex flex-col max-w-[1240px] mx-auto h-screen mt-[-433px]">
      <div className="mt-[423px] flex w-full items-center justify-center pl-5">
        <h1 className="text-2xl font-medium">{exercise.exercise}</h1>
        <ul className="flex flex-col w-full max-w-[1240px] mt-5 pb-10 p-3"></ul>
      </div>
    </div>
  );
};

export default ExerciseDetails;
