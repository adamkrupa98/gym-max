import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
const Home = () => {
  const [islogged, setIslogged] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIslogged(!!user);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className=" mt-[-163px] w-full h-screen flex items-center justify-center ">
        <p className="text-2xl text-[#f0a04b]">Ładowanie...</p>
      </div>
    );
  }
  return (
    <>
      {!islogged && (
        <div className="max-w-[1240px] mt-[-155px] w-full h-screen mx-auto flex flex-col justify-center items-center px-3 text-center ">
          <div className=" p-6 flex flex-col items-center">
            <h1 className="lg:text-4xl md:text-3xl text-2xl p-4 font-bold mt-20 text">
              Witaj na GymMax - Twoim osobistym towarzyszu w podnoszeniu
              maksymalnych osiągnięć na siłowni!
            </h1>
            <p className="font-medium p-4 text-center text-gray-800">
              Z nami każdy trening staje się nie tylko wyzwaniem, ale również
              historią Twojego rozwoju. Zapisuj swoje maksymalne wyniki, śledź
              postępy, i osiągaj coraz to nowe cele!
            </p>
            <Link
              to="/register"
              className="text-white bg-[#f0a04b] rounded-md p-2 mt-4 w-[250px] font-medium"
            >
              Dołącz teraz!
            </Link>
          </div>
        </div>
      )}
      {islogged && (
        <div className="max-w-[1240px] mt-[-155px] w-full h-screen mx-auto flex flex-col justify-center items-center px-3 text-center ">
          <div className=" p-5 flex flex-col md:rounded-full items-center ">
            <h1 className="lg:text-2xl md:text-3xl text-2xl p-4 font-bold">
              Witaj! Cieszymy się, że jesteś ponownie z nami na GymMax - Twoim
              osobistym towarzyszu w podnoszeniu maksymalnych osiągnięć na
              siłowni!
            </h1>
          </div>
        </div>
      )}
      {/* <TopResults /> */}
    </>
  );
};

export default Home;
