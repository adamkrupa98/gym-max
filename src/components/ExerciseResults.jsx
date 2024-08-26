import React, { useState, useEffect } from "react";
import {
  doc,
  getDoc,
  updateDoc,
  arrayUnion,
  Timestamp,
} from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { db } from "../firebase"; // Upewnij się, że poprawnie importujesz swoje instancje Firebase
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";

const ExerciseResults = ({ id }) => {
  const [exercise, setExercise] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [formData, setFormData] = useState({ sets: [] });
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
            timestamp: data.timestamp.toDate(),
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

  const handleAddEntry = async () => {
    try {
      const user = auth.currentUser;
      if (user) {
        const exerciseDoc = doc(db, "users", user.uid, "exercises", id);
        const newEntry = {
          date: Timestamp.now(),
          sets: [],
        };
        await updateDoc(exerciseDoc, {
          entries: arrayUnion(newEntry),
        });
        const exerciseSnapshot = await getDoc(exerciseDoc);
        if (exerciseSnapshot.exists()) {
          const data = exerciseSnapshot.data();
          setExercise({
            id: exerciseSnapshot.id,
            ...data,
            timestamp: data.timestamp.toDate(),
          });
        }
      } else {
        console.error("No user logged in!");
      }
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  const handleEditEntry = (entry) => {
    setSelectedEntry(entry);
    setFormData(entry);
    setIsModalOpen(true);
  };

  const handleChange = (index, event) => {
    const values = [...formData.sets];
    values[index][event.target.name] = event.target.value;
    setFormData({ ...formData, sets: values });
  };

  const handleAddRow = () => {
    setFormData({
      ...formData,
      sets: [...formData.sets, { reps: "", weight: "" }],
    });
  };

  const handleRemoveRow = (index) => {
    const values = [...formData.sets];
    values.splice(index, 1);
    setFormData({ ...formData, sets: values });
  };

  const handleDeleteEntry = async (entryToDelete) => {
    try {
      const user = auth.currentUser;
      if (user) {
        const exerciseDoc = doc(db, "users", user.uid, "exercises", id);
        const updatedEntries = exercise.entries.filter(
          (entry) => entry.date.toMillis() !== entryToDelete.date.toMillis()
        );
        await updateDoc(exerciseDoc, {
          entries: updatedEntries,
        });
        const exerciseSnapshot = await getDoc(exerciseDoc);
        if (exerciseSnapshot.exists()) {
          const data = exerciseSnapshot.data();
          setExercise({
            id: exerciseSnapshot.id,
            ...data,
            timestamp: data.timestamp.toDate(),
          });
        }
        setIsModalOpen(false);
        setSelectedEntry(null);
      } else {
        console.error("No user logged in!");
      }
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = auth.currentUser;
      if (user) {
        const exerciseDoc = doc(db, "users", user.uid, "exercises", id);
        const updatedEntries = exercise.entries.map((entry) =>
          entry.date.toMillis() === selectedEntry.date.toMillis()
            ? formData
            : entry
        );
        await updateDoc(exerciseDoc, {
          entries: updatedEntries,
        });
        const exerciseSnapshot = await getDoc(exerciseDoc);
        if (exerciseSnapshot.exists()) {
          const data = exerciseSnapshot.data();
          setExercise({
            id: exerciseSnapshot.id,
            ...data,
            timestamp: data.timestamp.toDate(),
          });
        }
        setIsModalOpen(false);
        setSelectedEntry(null);
      } else {
        console.error("No user logged in!");
      }
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  };

  const formatDate = (date) => {
    return date.toLocaleDateString("pl-PL");
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  const sortedEntries = exercise.entries
    ? exercise.entries.sort((a, b) => b.date.toMillis() - a.date.toMillis())
    : [];

  const lastTwoEntries = sortedEntries.slice(0, 3);

  const modalContent = (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg relative">
        <button
          onClick={() => setIsModalOpen(false)}
          className="absolute top-2 right-2 text-gray-700 text-3xl leading-none"
        >
          &times;
        </button>
        <h2 className="text-2xl mb-4">Edytuj dzień treningowy</h2>
        <form onSubmit={handleSubmit}>
          <table className="table-auto w-full mb-4">
            <thead>
              <tr>
                <th className="px-4 py-2">Seria</th>
                <th className="px-4 py-2">Powtórzenia</th>
                <th className="px-4 py-2">Ciężar (kg)</th>
                <th className="px-4 py-2">Usuń</th>
              </tr>
            </thead>
            <tbody>
              {formData.sets.map((row, index) => (
                <tr key={index}>
                  <td className="border px-4 py-2">{index + 1}</td>
                  <td className="border px-4 py-2">
                    <input
                      type="number"
                      name="reps"
                      value={row.reps}
                      onChange={(event) => handleChange(index, event)}
                      className="w-full p-2"
                      required
                    />
                  </td>
                  <td className="border px-4 py-2">
                    <input
                      type="number"
                      name="weight"
                      value={row.weight}
                      onChange={(event) => handleChange(index, event)}
                      className="w-full p-2"
                      required
                    />
                  </td>
                  <td className="border px-4 py-2 text-center">
                    <button
                      type="button"
                      onClick={() => handleRemoveRow(index)}
                      className="text-red-500"
                    >
                      Usuń
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-between">
            <button
              type="button"
              onClick={handleAddRow}
              className="bg-green-500 text-white px-4 py-2 rounded "
            >
              Dodaj serię
            </button>
            <button
              type="button"
              onClick={() => handleDeleteEntry(selectedEntry)}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Usuń dzień
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Zapisz
            </button>
          </div>
        </form>
      </div>
    </div>
  );
  return (
    <div className="w-full flex flex-col text-gray-900 border border-slate-400 rounded-lg p-4 mt-2 bg-gray-200 bg-opacity-30 backdrop-blur-md shadow-lg hover:shadow-xl transition duration-300 ease-in-out relative z-10 md:mt-0 h-[47vh] md:h-full overflow-auto">
      <h1 className="text-2xl font-medium pl-3 mb-4">{exercise.exercise}</h1>
      {lastTwoEntries.length > 0 ? (
        lastTwoEntries.map((entry, index) => (
          <div
            key={index}
            className="flex items-center justify-between border border-slate-300 rounded-lg p-4 mt-2 bg-slate-400 bg-opacity-60 backdrop-blur-md shadow-lg hover:shadow-xl transition duration-300 ease-in-out relative z-10 overflow-auto max-h-96 hover:bg-slate-100 hover:text-black"
            onClick={() => handleEditEntry(entry)}
          >
            <div className="overflow-auto w-full">
              <p className="font-medium">{formatDate(entry.date.toDate())}</p>
              <div className="flex">
                {entry.sets.map((set, i) => {
                  return (
                    <p key={i} className="ml-3">
                      {/*  */}
                      {i + 1 === entry.sets.length
                        ? `${set.reps}x${set.weight}kg`
                        : `${set.reps}x${set.weight}kg,`}
                    </p>
                  );
                })}
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>Brak dni treningowych dla tego ćwiczenia.</p>
      )}
      <div className="flex justify-between w-[93%] md:w-[95%] md:mt-5 bottom-5">
        <Link
          to={`/fullHistory/${exercise.id}`}
          className="text-2xl pr-3 mt-2 relative z-20 border-2 border-slate-300 rounded-md p-2 hover:text-[#f0a04b] hover:border-[#f0a04b]"
        >
          Pełna historia
        </Link>
        <button
          onClick={handleAddEntry}
          className="text-2xl pr-3 mt-2 relative z-20 border-2 rounded-md border-slate-300 p-2 hover:text-[#f0a04b] hover:border-[#f0a04b]"
        >
          Dodaj wynik
        </button>
      </div>

      {isModalOpen && ReactDOM.createPortal(modalContent, document.body)}
    </div>
  );
};

export default ExerciseResults;
