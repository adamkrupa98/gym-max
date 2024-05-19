import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { MdDeleteOutline } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
import { FaRegEdit } from "react-icons/fa";
import Modal from "react-modal";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { MdOutlineCancel } from "react-icons/md";
import BackButton from "./BackButton";

const ExerciseDetails = () => {
  const { id } = useParams();
  const { data, loading, error, setData } = useFetch(
    "http://localhost:8001/stats/" + id
  );
  const max =
    data.details && data.details.length > 0
      ? data.details.reduce((max, current) => {
          const maxNumber = parseFloat(max.max);
          const currentNumber = parseFloat(current.max);
          return maxNumber > currentNumber ? max : current;
        }, data.details[0])
      : null;
  const history = useHistory();

  const handleClick = (index, id) => {
    fetch("http://localhost:8001/stats/" + id, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        const updatedStats = data.details.filter((el, i) => {
          return i !== index;
        });
        data.details = updatedStats;

        fetch("http://localhost:8001/stats/" + id, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        })
          .then(() => {
            setData((prevData) => ({
              ...prevData,
              details: updatedStats,
            }));
            console.log("Success");
          })
          .catch((error) => {
            console.error("Error - ", error.message);
          });
      })
      .catch((error) => {
        console.error("Error-", error.message);
      });
  };

  const handleDelete = () => {
    fetch("http://localhost:8001/stats/" + id, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        history.goBack();
      });
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [modifiedData, setModifiedData] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const [exerciseName, setExcerciseName] = useState("");

  useEffect(() => {
    if (data && data.exercise) {
      setExcerciseName(data.exercise);
    }
  }, [data]);
  const handleModify = (index, id) => {
    setModifiedData(data.details[index]);
    setSelectedIndex(index);
    setSelectedId(id);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedIndex(null);
    setModifiedData(null);
  };

  const handleSaveModification = () => {
    fetch("http://localhost:8001/stats/" + selectedId, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        data.details = [modifiedData];

        fetch("http://localhost:8001/stats/" + selectedId, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        })
          .then(() => {
            setData((prevData) => ({
              ...prevData,
              details: [modifiedData],
            }));
            console.log("Success");
          })
          .catch((error) => {
            console.error("Error - ", error.message);
          });
      })
      .catch((error) => {
        console.error("Error-", error.message);
      });
    setIsModalOpen(false);
  };

  const handleNameChange = (e) => {
    const newData = { ...data };
    newData.exercise = e.target.value;
    setExcerciseName(e.target.value);
    fetch("http://localhost:8001/stats/" + id, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newData),
    })
      .then(() => {
        console.log("Success");
      })
      .catch((error) => {
        console.error("Error - ", error.message);
      });
  };

  return (
    <>
      <div className="max-w-[1240]px w-full flex h-screen mt-[-163px] flex-col items-center justify-center">
        {loading && <div>is loading ...</div>}
        {error && <div>Error - {error.message}</div>}
        {data && (
          <div className="h-auto text-center max-w-[800px] w-full">
            {data && (
              <input
                type="text"
                value={exerciseName}
                className="font-bold lg:text-7xl md:text-5xl text-5xl py-4 md:py-5 lg:py-6 first-letter:uppercase text-center w-full"
                onChange={handleNameChange}
              />
            )}
            <p className="text-4xl lg:text-5xl">
              Obecny rekord: {max !== null ? max.max : "0"} kg
            </p>
            <ul className="mt-10 text-2xl lg:text-3xl">
              {data.details &&
                data.details.length > 0 &&
                data.details.map((x, index) => (
                  <li key={index} className="flex justify-center py-3">
                    <p className="w-[250px] md:w-[300px] text-left">
                      {x.date} - {x.max}kg
                    </p>
                    <button
                      className="px-1 bg-red-600 py-1 rounded-md ml-3 text-white hover:bg-white hover:text-red-600 border-2 border-red-600"
                      onClick={() => handleClick(index, id)}
                    >
                      <MdDeleteOutline />
                    </button>
                    <button
                      className="px-1 bg-blue-600 py-1 rounded-md ml-3 text-white hover:bg-white hover:text-blue-600 border-2 border-blue-600"
                      onClick={() => handleModify(index, id)}
                    >
                      <FaRegEdit className="ml-2" />
                    </button>
                  </li>
                ))}
            </ul>
            {data.length > 5 && <div>Więcej...</div>}
          </div>
        )}

        <div className="flex mt-5 max-w-[400px] md:max-w-[450px] w-full p-3 justify-between">
          <Link
            to={`/addresult/${id}`}
            id="add-new"
            className="p-2 rounded-md font-medium flex items-center text-white bg-[#f0a04b]"
          >
            <IoMdAdd size={20} /> <p className="px-2">Dodaj nowy wynik</p>
          </Link>
          <button
            id="delete"
            onClick={handleDelete}
            className="p-2 rounded-md font-medium flex items-center text-white bg-red-600"
          >
            Usuń ćwiczenie
          </button>
        </div>
        <BackButton />
      </div>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={handleCloseModal}
        contentLabel="Modify Exercise"
        className="max-w-[800px] mx-auto h-screen-200 h-[700px] mt-[12vh] flex fle-col justify-center items-center bg-[#f0a04b]"
      >
        {selectedIndex !== null && modifiedData && (
          <div className="w-[500px] h-[500px] flex flex-col items-center justify-center text-left bg-black backdrop-blur-sm bg-opacity-20 rounded-md">
            <h2 className="font-medium text-2xl md:text-5xl w-[300px] text-center text-white">
              Edytuj wpis
            </h2>
            <label className="font-medium text-xl md:text-2xl mt-5 w-[300px] text-white">
              Data:
            </label>
            <input
              type="date"
              value={modifiedData.date}
              onChange={(e) =>
                setModifiedData({ ...modifiedData, date: e.target.value })
              }
              className="mt-5 w-[300px] text-center rounded-lg"
            />
            <label className="font-medium text-xl md:text-2xl mt-5 w-[300px] text-white">
              Ciężar:
            </label>{" "}
            <input
              type="text"
              value={modifiedData.max}
              onChange={(e) =>
                setModifiedData({ ...modifiedData, max: e.target.value })
              }
              className="mt-5 w-[300px] text-center rounded-lg"
            />
            <div className="flex w-[250px] mt-7 justify-between">
              <button
                onClick={handleSaveModification}
                className="border-2 p-2 bg-green-600 rounded-md"
              >
                <IoMdCheckmarkCircleOutline size={30} />
              </button>
              <button
                onClick={handleCloseModal}
                className="border-2 p-2 bg-red-600 rounded-md"
              >
                <MdOutlineCancel size={30} />
              </button>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
};

export default ExerciseDetails;
