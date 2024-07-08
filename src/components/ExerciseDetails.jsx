import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import ExerciseResults from "./ExerciseResults";
import Max from "./Max";

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

  if (loading) {
    return (
      <div className="flex w-full min-h-screen justify-center items-center flex-col">
        <p className="text-2xl text-[#f0a04b]">Loading...</p>
      </div>
    );
  }
  return (
    <div className="flex flex-col max-w-[1240px] mx-auto h-screen mt-[-37%] md:mt-[-163px] items-center">
      <div className="mt-[155px] md:mt-[15%] flex flex-col w-full justify-center md:grid md:grid-cols-2">
        <div className="flex flex-col h-auto mt-5 w-full">
          <ExerciseResults id={exercise.id} />
        </div>
        <div className="flex h-auto w-full">
          <Max data={exercise} />
        </div>
        <div className="flex w-full"></div>
      </div>
    </div>
  );
};

export default ExerciseDetails;
