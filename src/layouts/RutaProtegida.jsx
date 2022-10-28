import { Outlet, Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Spinner from "../helpers/Spinner";
import { useEffect, useState } from "react";

const RutaProtegida = () => {
  const { auth } = useAuth();
  const [cargando, setCargando] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setCargando(false);
    }, 2500);
  }, []);

  // if (cargando) {
  //   return <Spinner />;
  // }
  return (
    <>
      {cargando ? (
        <Spinner />
      ) : auth._id ? (
        <div className="bg-gray-100">
          <Header />

          <div className="md:flex md:min-h-screen">
            <Sidebar />

            <main className="p-10 flex-1 ">
              <Outlet />
            </main>
          </div>
        </div>
      ) : (
        <Navigate to="/" />
      )}
    </>
  );
};

export default RutaProtegida;
