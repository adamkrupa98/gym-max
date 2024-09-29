import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { useForm, userForm } from "react-hook-form";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { db } from "../firebase";
import { collection, addDoc, getDocs, query } from "firebase/firestore";
import { BarChart } from "@mui/x-charts/BarChart";

const Cardio = () => {
  const [selectedRange, setSelectedRange] = useState("week");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cardioTrainings, setCardioTrainings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [days, setDays] = useState(0);
  const [xLabels, setXLabels] = useState([
    "Poniedziałek",
    "Wtorek",
    "Środa",
    "Czwartek",
    "Piątek",
    "Sobota",
    "Niedziela",
  ]);

  const uData = [4000, 3000, 2000, 2780, 1890, 2390, 3490];
  const pData = [2400, 1398, 9800, 3908, 4800, 3800, 4300];

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const auth = getAuth();

  useEffect(() => {
    const fetchCardioTrainings = async (userId) => {
      try {
        const q = query(collection(db, "users", userId, "cardio"));
        const cardioSnapshot = await getDocs(q);
        const cardioData = cardioSnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            ...data,
            timestamp: data.timestamp.toDate(),
          };
        });
        setCardioTrainings(cardioData);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchCardioTrainings(user.uid);
        setLoading(false);
      } else {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [auth]);

  const onSubmit = async (data) => {
    const user = auth.currentUser;
    if (user) {
      const cardioCollection = collection(db, "users", user.uid, "cardio");

      await addDoc(cardioCollection, {
        time: data.time,
        kcal: data.kcal,
        timestamp: new Date(),
      });

      const cardioSnapshot = await getDocs(cardioCollection);
      const cardioData = cardioSnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          timestamp: data.timestamp.toDate(),
        };
      });
      setCardioTrainings(cardioData);
      setIsModalOpen(false);
      reset();
    }
  };
  useEffect(() => {
    let now = new Date();
    let dataRange = new Date();
    dataRange.setDate(now.getDate() - days);
    let trainingFiltered = cardioTrainings.filter((training) => {
      let trainingDate = training.timestamp;
      return trainingDate >= dataRange && trainingDate <= now;
    });
  }, [cardioTrainings, days]);

  function countWeeksInLastMonthRange() {
    const today = new Date();
    const lastMonth = new Date();

    lastMonth.setMonth(today.getMonth() - 1);

    const diffInTime = today.getTime() - lastMonth.getTime();
    const diffInDays = Math.ceil(diffInTime / (1000 * 60 * 60 * 24));

    const fullWeeks = Math.floor(diffInDays / 7);

    const extraDays = diffInDays % 7 !== 0 ? 1 : 0;

    return fullWeeks + extraDays;
  }

  useEffect(() => {
    const daysMapping = {
      week: 7,
      month: 31,
      halfyear: 183,
      year: 366,
    };
    let now = new Date();
    let months = [
      "Styczne",
      "Luty",
      "Marzec",
      "Kwiecień",
      "Maj",
      "Czerwiec",
      "Lipiec",
      "Sierpień",
      "Wrzesień",
      "Październik",
      "Listopad",
      "Grudzień",
    ];
    let days = [
      "Niedziela",
      "Poniedziałek",
      "Wtorek",
      "Środa",
      "Czwartek",
      "Piątek",
      "Sobota",
    ];
    let selectedXLabels = [];

    if (selectedRange === "week") {
      let day = now.getDay();
      for (let i = 6; i >= 0; i--) {
        let indexDay = (day - i + 7) % 7;
        selectedXLabels.push(days[indexDay]);
      }
    } else if (selectedRange === "month") {
      let weeks = countWeeksInLastMonthRange(now);
      for (let i = 1; i <= weeks; i++) {
        selectedXLabels.push(`${i} tydzień`);
      }
    } else if (selectedRange === "halfyear") {
      let month = now.getMonth();
      for (let i = 5; i >= 0; i--) {
        let indexMonth = (month - i + 12) % 12;
        selectedXLabels.push(months[indexMonth]);
      }
    } else {
      let month = now.getMonth();
      for (let i = 11; i >= 0; i--) {
        let indexMonth = (month - i + 12) % 12;
        selectedXLabels.push(months[indexMonth]);
      }
    }

    setXLabels(selectedXLabels);
    setDays(daysMapping[selectedRange] || 0);
  }, [selectedRange]);

  const modalContent = (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg relative w-[500px]">
        <button
          onClick={() => setIsModalOpen(false)}
          className="absolute top-2 right-2 text-gray-700 text-3xl leading-none"
        >
          &times;
        </button>
        <p className="text-center text-2xl">Uzupełnij dane treningu</p>
        <div className="mt-9">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-control flex flex-col">
              <label className="text-sm ">Czas (min.)</label>
              <input
                className="peer bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:border-[#f0a04b] focus:outline-none focus:ring-0"
                type="number"
                name="time"
                {...register("time", { required: true })}
              />
              {errors.time && (
                <span className="text-red-500">To pole jest wymagane</span>
              )}
            </div>
            <div className="form-control flex flex-col mt-4">
              <label className="text-sm ">Kcal</label>
              <input
                className="peer bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:border-[#f0a04b] focus:outline-none focus:ring-0border-b-2 rounded-sm appearance-none"
                type="number"
                name="kcal"
                {...register("kcal", { required: true })}
              />
              {errors.kcal && (
                <span className="text-red-500">To pole jest wymagane</span>
              )}
            </div>
            <div className="flex">
              <button
                type="submit"
                className="border-2 border-[#f0a04b] p-1 rounded-md mt-6 bg-[#f0a04b] text-white hover:border-[#ab733771]"
              >
                Zapisz
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
  return (
    <div className="flex h-screen mt-[-155px] justify-center">
      <div className="mt-[20vh] max-w-[800px] w-full">
        <div className="flex justify-between">
          <div className="flex justify-between w-[50%]">
            <button
              className={`text-xl border w-[35%] rounded-md ${selectedRange === "week" ? "bg-[#f0a04b]" : "bg-gray-400"} text-white p-1`}
              onClick={() => setSelectedRange("week")}
            >
              Tydzień
            </button>
            <button
              className={`text-xl border w-[35%] rounded-md ${selectedRange === "month" ? "bg-[#f0a04b]" : "bg-gray-400"} text-white p-1`}
              onClick={() => setSelectedRange("month")}
            >
              Miesiąc
            </button>
            <button
              className={`text-xl border w-[35%] rounded-md ${selectedRange === "halfyear" ? "bg-[#f0a04b]" : "bg-gray-400"} text-white p-1`}
              onClick={() => setSelectedRange("halfyear")}
            >
              Pół roku
            </button>
            <button
              className={`text-xl border w-[35%] rounded-md ${selectedRange === "year" ? "bg-[#f0a04b]" : "bg-gray-400"} text-white p-1`}
              onClick={() => setSelectedRange("year")}
            >
              Rok
            </button>
          </div>
          <div>
            <button
              className="bg-[#f0a04b] text-2xl p-1 rounded-md border-2 text-white hover:border-[#ab733771]"
              onClick={() => setIsModalOpen(true)}
            >
              Dodaj trening
            </button>
          </div>
        </div>
        <div className="flex mt-10">
          <BarChart
            width={1000}
            height={450}
            series={[
              { data: pData, label: "kcal", id: "kcal" },
              { data: uData, label: "czas", id: "time" },
            ]}
            xAxis={[{ data: xLabels, scaleType: "band" }]}
          />
        </div>
        <div>
          <p className="text-2xl">Łącznie spalone zostało: kcal</p>
        </div>

        {loading && (
          <div className="mt-10 flex">
            <p>Wczytywanie danych...</p>
          </div>
        )}
      </div>
      {isModalOpen && ReactDOM.createPortal(modalContent, document.body)}
    </div>
  );
};

export default Cardio;
