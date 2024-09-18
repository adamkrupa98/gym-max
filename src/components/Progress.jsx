import React from "react";
import { useState } from "react";
import { useEffect } from "react";
const Progress = () => {
  const [selectedProgressType, setSelectedProgessType] = useState("week");

  const handleChangeProgressType = (x) => {
    setSelectedProgessType(x);
  };
  useEffect(() => {}, [selectedProgressType]);
  return (
    <div className="w-full flex flex-col text-gray-900 border border-slate-400 rounded-lg p-4 mt-2 bg-gray-200 bg-opacity-30 backdrop-blur-md shadow-lg hover:shadow-xl transition duration-300 ease-in-out relative z-10 h-full md:mt-1 md:ml-1">
      <div className="flex justify-between ml-[15%] mr-[15%]">
        <button
          className={`text-xl border w-[35%] rounded-md ${selectedProgressType === "week" ? "bg-blue-400" : "bg-gray-400"} text-white p-1`}
          onClick={() => handleChangeProgressType("week")}
        >
          Tydzień
        </button>
        <button
          className={`text-xl border w-[35%] rounded-md ${selectedProgressType === "month" ? "bg-blue-400" : "bg-gray-400"} text-white p-1`}
          onClick={() => handleChangeProgressType("month")}
        >
          Miesiąc
        </button>
        <button
          className={`text-xl border w-[35%] rounded-md ${selectedProgressType === "year" ? "bg-blue-400" : "bg-gray-400"} text-white p-1`}
          onClick={() => handleChangeProgressType("year")}
        >
          Rok
        </button>
      </div>
      <div className="flex flex-col w-full h-full items-center mt-10">
        <p className="text-xl">Twój progres wynosi:</p>
        <p className="text-4xl text-green-500">+20%</p>
      </div>
    </div>
  );
};

export default Progress;
