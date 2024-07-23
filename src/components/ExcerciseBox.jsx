import { Link } from "react-router-dom";

const ExcerciseBox = ({ exercise, max = 0, date = "-", exerciseId }) => {
  const formattedDate = date.toLocaleDateString();
  return (
    <div className="w-full flex-col bg-transparent items-center h-full mb-2 row">
      <Link
        to={`/exercise/details/${exerciseId}`}
        className="flex items-center justify-between border border-slate-300 rounded-lg p-4 mt-2 bg-slate-800 bg-opacity-60 backdrop-blur-md shadow-lg hover:shadow-xl transition duration-300 ease-in-out"
      >
        <h1 className="text-2xl font-semibold text-white first-letter:uppercase w-1/6">
          {exercise}
        </h1>
        <div className="flex w-full justify-between">
          <p className="text-lg font-medium text-white hidden md:block">
            {formattedDate}:
          </p>
          <p className="text-lg font-medium text-white hidden md:block">
            Max: {max}kg
          </p>
        </div>
      </Link>
    </div>
  );
};

export default ExcerciseBox;
