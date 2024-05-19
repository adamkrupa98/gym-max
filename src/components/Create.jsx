import { useState } from "react";
import { useHistory } from "react-router-dom";
import BackButton from "./BackButton";
const Create = () => {
  const [exercise, setExercise] = useState("");
  const [max, setMax] = useState("");
  const history = useHistory();
  const handleSubmit = (e) => {
    e.preventDefault();
    const currentDate = new Date().toISOString().split("T")[0];

    const stats = {
      exercise,
      details: [
        {
          max,
          date: currentDate,
        },
      ],
    };
    fetch("http://localhost:8001/stats", {
      method: "POST",
      headers: { "Content-Type": "application-json" },
      body: JSON.stringify(stats),
    }).then(() => {
      history.goBack();
    });
  };
  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-[1240px] h-screen mt-[-163px] flex flex-col justify-center items-center mx-auto"
      >
        <label className="font-medium md:text-4xl text-2xl">
          Nazwa ćwiczenia:{" "}
        </label>
        <input
          type="text"
          value={exercise}
          onChange={(e) => setExercise(e.target.value)}
          className="mt-5 border-2 border-slate-400 p-1 text-center"
        />
        <label className="font-medium md:text-4xl text-2xl mt-10">
          Aktualny rekord (kg):
        </label>
        <input
          type="number"
          value={max}
          onChange={(e) => {
            setMax(e.target.value);
          }}
          className="mt-5 border-2 border-slate-400  p-1 text-center"
        />
        <button className="mt-10 w-[200px] border-2 py-1 rounded-full border-[#a87238] bg-[#f0a04b] text-white font-medium">
          Zapisz
        </button>
      </form>
      <BackButton />
    </>
  );
};

export default Create;
