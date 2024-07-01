import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { getAuth } from "firebase/auth";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";

const Create = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const history = useHistory();
  const auth = getAuth();

  const onSubmit = async (data) => {
    const user = auth.currentUser;
    if (user) {
      const exercisesCollection = collection(
        db,
        "users",
        user.uid,
        "exercises"
      );

      await addDoc(exercisesCollection, {
        exercise: data.name,
        score: data.score,
        timestamp: new Date(),
      });
      history.push("/exercises");
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-[1240px] h-screen mt-[-163px] flex flex-col justify-center items-center mx-auto"
      >
        <div className="max-w-[1200px] w-full p-3">
          <div className="flex">
            <label className="font-medium md:text-2xl text-2x w-1/5">
              Nazwa ćwiczenia:{" "}
            </label>
            <input
              type="text"
              className=" border-2 border-slate-400 p-1 "
              {...register("name", { required: true })}
            />
            {errors.name && (
              <span className="text-red-500">To pole jest wymagane</span>
            )}
          </div>
          <div className="flex mt-5">
            <label className="font-medium md:text-2xl text-2xl w-1/5">
              Wynik (kg):
            </label>
            <input
              type="number"
              className="border-2 border-slate-400  p-1"
              {...register("score", { required: true })}
            />
            {errors.score && (
              <span className="text-red-500">To pole jest wymagane</span>
            )}
          </div>
          <div>
            <button className="text-white bg-gradient-to-r from-orange-500 via-orange-600 to-orange-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-orange-300 dark:focus:ring-orange-800 shadow-lg shadow-orange-500/50 dark:shadow-lg dark:shadow-orange-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mt-10 w-[100px]">
              Zapisz
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default Create;
