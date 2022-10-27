import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useProyectos from "../hooks/useProyectos";
import Swal from "sweetalert2";

const PreviewProyecto = ({ proyecto }) => {
  const { auth } = useAuth();
  const { eliminarProyecto, tarea } = useProyectos();

  const { nombre, _id, cliente, creador  } = proyecto;
  const handleClickBorrar = () => {
    Swal.fire({
      title: "Deseas eliminar este proyecto?",
      text: "Un proyecto eliminado no se podra recuperar!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "Cancelar",
      confirmButtonText: "Borrar",
    }).then((result) => {
      if (result.isConfirmed) {
        eliminarProyecto(_id);
        Swal.fire("Eliminado!", "Tu proyecto ha sido Eliminado.", "success");
      }
    });
  };

  return (
    <div className="border-b p-3 flex flex-col md:flex-row justify-between">
      <div className="flex items-center text-center gap-2">
        <p className="flex-1 uppercase font-bold text-2xl">
          {nombre}

          <span className=" text-gray-500 uppercase">
            {" -"} Cliente:{"     "}
          </span>
             {cliente}
        </p>

        {auth._id !== creador && (
          <p className="p-1 text-xs rounded-lg text-white bg-green-500 font-bold uppercase">
            Colaborador
          </p>
        )}
        <div className="flex ">
        {(auth._id === creador) && proyecto.colaboradores?.length > 0 && (
            <p className="uppercase  bg-blue-600 text-white border-b p-1 flex md:flex-row justify-center text-center items-center rounded-lg">
              Colaboradores: {proyecto.colaboradores?.length}
            </p>
          )}
        </div>
      </div>

      <div className="p-5 flex flex-col md:flex-row justify-between gap-2 ">
        <Link
          to={`${_id}`}
          className=" uppercase font-bold px-2 bg-sky-600 text-white border-b p-3 flex md:flex-row justify-center text-center items-center hover:bg-sky-800 transition-colors rounded-lg"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
            />
          </svg>
          Ver Proyecto
        </Link>
        <Link
          to={`/proyectos/editar/${_id}`}
          className="uppercase font-bold bg-teal-500 text-white border-b p-3 flex md:flex-row justify-center text-center items-center rounded-lg hover:bg-teal-800 transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
            />
          </svg>
          Editar
        </Link>
        <button
          className="bg-red-700 hover:bg-red-800  text-white border-b p-3 flex md:flex-row justify-center text-center items-center rounded-lg  uppercase font-bold"
          onClick={handleClickBorrar}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
          Eliminar
        </button>
      </div>
    </div>
  );
};

export default PreviewProyecto;
