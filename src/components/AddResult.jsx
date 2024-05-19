import { useState } from "react";
import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { useHistory } from "react-router-dom";
import BackButton from "./BackButton";

const AddResult = () => {
  const [result, setResult] = useState("");
  const { id } = useParams();
  const { data, loading, error, setData } = useFetch(
    "http://localhost:8001/stats/" + id
  );
  const history = useHistory();

  const handleSumbit = (x) => {
    x.preventDefault();

    const newDetail = {
      max: result,
      date: new Date().toISOString().split("T")[0],
    };
    const newData = data;
    newData.details.push(newDetail);

    fetch("http://localhost:8001/stats/" + id, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("udalo się zapisać");
        history.goBack();
      });
  };

  return (
    <>
      <form
        onSubmit={handleSumbit}
        className="max-w-[1240px] w-full flex mx-auto items-center flex-col h-screen mt-[-164px] justify-center"
      >
        <label
          htmlFor="wynik"
          className="font-bold lg:text-7xl md:text-6xl text-5xl text-center"
        >
          Nowy wynik
        </label>
        <input
          type="number"
          name="wynik"
          id="wynik"
          value={result}
          onChange={(e) => {
            setResult(e.target.value);
          }}
          className="mt-10 rounded-md px-2 py-1 border-2 text-center"
        />
        <button className="mt-6 px-5 py-1 rounded-md bg-[#f0a04b] font-medium">
          Dodaj
        </button>
      </form>
      <BackButton />
    </>
  );
};

export default AddResult;
