import React from "react";

const ExerciseResults = ({ data }) => {
  return (
    <div className="w-full flex flex-col text-white border border-slate-300 rounded-lg p-4 mt-2 bg-slate-900 bg-opacity-60 backdrop-blur-md shadow-lg hover:shadow-xl transition duration-300 ease-in-out relative z-10 md:mt-0 h-[40vh] md:h-[50vh]">
      <h1 className="text-2xl font-medium pl-3">{data.exercise}</h1>

      {Object.entries(data).map(([key, exercise]) => (
        <div
          key={key}
          className="flex items-center justify-between border border-slate-300 rounded-lg p-4 mt-2 bg-slate-800 bg-opacity-60 backdrop-blur-md shadow-lg hover:shadow-xl transition duration-300 ease-in-out relative z-10"
        >
          test
        </div>
      ))}
      <div className="flex justify-between w-[97%] fixed bottom-3">
        <button className="text-2xl pr-3 mt-2 relative z-20">
          Pełna historia
        </button>
        <button className="text-2xl pr-3 mt-2 relative z-20">
          Dodaj wynik
        </button>
      </div>
    </div>
  );
};

export default ExerciseResults;
