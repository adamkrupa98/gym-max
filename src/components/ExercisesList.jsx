import { Link } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import ExcerciseBox from "./ExcerciseBox";
import useGetStats from "../hooks/useGetStats";
const Exercises = () => {
  const {
    data: stats,
    loading,
    error,
  } = useFetch("http://localhost:8001/stats");

  const { maxRecordsByExercise } = useGetStats(stats);

  const containerClass = stats.length <= 3 ? "h-screen" : "h-auto";

  return (
    <div
      className={`max-w-[1240px] w-full flex flex-col items-center ${containerClass} mt-[-163px] mx-auto`}
    >
      <h1 className="mt-[170px] font-bold text-3xl md:text-4xl lg:text-5xl">
        Zapisane ćwiczenia: {stats.length > 0 ? stats.length : ""}
      </h1>
      <Link
        id="add_new"
        to="/create"
        className="mt-10 bg-white border-[#f0a04b] border-2 rounded-md p-2 font-medium text-[#f0a04b] w-40 text-center hover:text-white hover:bg-[#f0a04b]"
      >
        + Dodaj nowe
      </Link>

      {loading && <div>Loading...</div>}
      {error && <div>Error...("{error.message}")</div>}
      {maxRecordsByExercise && (
        <div
          className={`grid md:grid-cols-3 w-full max-w-[1240px] h-auto text-center mt-14 pb-10 items-center`}
        >
          {maxRecordsByExercise.map((x, index) => (
            <ExcerciseBox
              key={index}
              exerciseId={x.id}
              max={x.details[0].max}
              date={x.details[0].date}
              exercise={x.exercise}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Exercises;
