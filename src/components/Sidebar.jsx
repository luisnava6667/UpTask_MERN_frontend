import { useState } from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useProyectos from "../hooks/useProyectos";

const Sidebar = () => {
  const { auth } = useAuth();
  const [id, setId] = useState(null);
  const params = useParams();
  const { pathname } = useLocation();
  return (
    <aside className="md:w-1/3 lg:w-1/5 xl:w-1/6 px-5 py-10">
      <p className="text-xl font-bold mb-4 ">Hola: {auth.nombre}</p>
      <div className="m-1">
        <Link
          to="crear-proyecto"
          className=" uppercase font-bold bg-sky-600 w-full p-3 my-2  text-white rounded cursor-pointer hover:bg-sky-700 transition-colors flex md:flex-row justify-center text-center  "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
              clipRule="evenodd"
            />
          </svg>
          Nuevo Proyecto
        </Link>
        {pathname !== `/proyectos` ? (
          <Link
            to={"/proyectos"}
            className="bg-teal-600 w-full p-3 uppercase font-bold text-white rounded cursor-pointer transition-colors hover:bg-teal-700 flex md:flex-row justify-center text-center"
          >
            Ver Todos los Proyecto
          </Link>
        ) : null}
        {pathname === `/proyectos/editar/${params.id}` ||
        pathname === `/proyectos/nuevo-colaborador/${params.id}` ? (
          <Link
            to={`/proyectos/${params.id}`}
            className=" uppercase font-bold bg-cyan-600 w-full p-3 my-2  text-white rounded cursor-pointer hover:bg-cyan-700 transition-colors flex md:flex-row justify-center text-center "
          >
            Volver al Proyecto
          </Link>
        ) : (
          <></>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
