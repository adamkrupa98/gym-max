import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { MdDateRange } from "react-icons/md";
const Progress = ({ data }) => {
  const [selectedProgressType, setSelectedProgessType] = useState("week");
  const [bestResult, setBestResult] = useState(0);
  const [worseResult, setWorseResult] = useState(0);
  const [exercise, setExercise] = useState(null);
  const [days, setDays] = useState(0);
  const [filtredEntries, setFiltredEntries] = useState(null);
  useEffect(() => {
    setExercise(data);
  }, [data]);
  useEffect(() => {
    const daysMapping = {
      month: 30,
      quarter: 90,
      year: 365,
    };
    setDays(daysMapping[selectedProgressType] || 0);
  }, [selectedProgressType]);
  useEffect(() => {
    if (exercise != null) {
      let now = new Date();
      let dataRange = new Date();
      dataRange.setDate(now.getDate() - days);
      console.log(now, dataRange);

      let getExerciseFromRange = exercise.entries.filter((entry) => {
        let entryDate = entry.date.toDate();
        return entryDate >= dataRange && entryDate <= now;
      });
      setFiltredEntries(getExerciseFromRange);
    }
  }, [days]);

  useEffect(() => {
    console.log(filtredEntries);
  }, [filtredEntries]);
  const handleChangeProgressType = (x) => {
    setSelectedProgessType(x);
  };
  useEffect(() => {}, [selectedProgressType]);
  return (
    <div className="w-full flex flex-col text-gray-900 border border-slate-400 rounded-lg p-4 mt-2 bg-gray-200 bg-opacity-30 backdrop-blur-md shadow-lg hover:shadow-xl transition duration-300 ease-in-out relative z-10 h-full md:mt-1 md:ml-1">
      <div className="flex justify-between ml-[15%] mr-[15%]">
        <button
          className={`text-xl border w-[35%] rounded-md ${selectedProgressType === "month" ? "bg-blue-400" : "bg-gray-400"} text-white p-1`}
          onClick={() => {
            handleChangeProgressType("month");
          }}
        >
          Miesiąc
        </button>
        <button
          className={`text-xl border w-[35%] rounded-md ${selectedProgressType === "quarter" ? "bg-blue-400" : "bg-gray-400"} text-white p-1`}
          onClick={() => {
            handleChangeProgressType("quarter");
          }}
        >
          Kwartał
        </button>
        <button
          className={`text-xl border w-[35%] rounded-md ${selectedProgressType === "year" ? "bg-blue-400" : "bg-gray-400"} text-white p-1`}
          onClick={() => {
            handleChangeProgressType("year");
          }}
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
