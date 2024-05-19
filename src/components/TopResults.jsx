import React from "react";
import useFetch from "../hooks/useFetch";
import useGetStats from "../hooks/useGetStats";
import ExcerciseBox from "./ExcerciseBox";
import Timer from "./Timer";

const TopResults = () => {
  const { data, loading, error } = useFetch("http://localhost:8001/stats");
  const { maxRecordsByExercise, newest } = useGetStats(data);
  const targetDate = new Date(newest);
  return (
    <>
      <div className="w-full mx-auto flex flex-col items-center justify-center text-center mt-4 mb-1 ">
        {loading && <div>Loading....</div>}
        {error && (
          <div>Błąd pobierania danych z serwera - "{error.message}"</div>
        )}
        {data.length > 0 && (
          <>
            <div className="w-full h-1 bg-[#f0a04b] mt-10"></div>

            <h1 className="text-4xl md:text-6xl lg:text-5xl font-bold p-4">
              Najlepsze wyniki
            </h1>

            <div
              className={
                data.length > 2
                  ? `max-w-[1240px] grid md:grid-cols-${Math.min(data.length, 3)} my-10 w-full`
                  : "max-w-[1240px] grid md:grid-cols-2 my-10 w-full"
              }
            >
              {maxRecordsByExercise.map((dane, index) => (
                <ExcerciseBox
                  key={index}
                  exerciseId={dane.id}
                  exercise={dane.exercise}
                  max={dane.details[0].max}
                  date={dane.details[0].date}
                />
              ))}
            </div>
            <div className="w-full h-1 bg-[#f0a04b]"></div>
            <Timer targetDate={targetDate} />
          </>
        )}
      </div>
    </>
  );
};

export default TopResults;
