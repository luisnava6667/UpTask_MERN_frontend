import { useEffect } from "react";
import { useParams } from "react-router-dom";
import FormularioProyecto from "../components/FormularioProyecto";
import useProyectos from "../hooks/useProyectos";
import Swal from "sweetalert2";
import Spinner from "../helpers/Spinner";

const EditarProyecto = () => {
  const params = useParams();
  const { obtenerProyecto, proyecto, cargando, eliminarProyecto } =
    useProyectos();

  useEffect(() => {
    obtenerProyecto(params.id);
  }, []);

  const handleClick = () => {
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
        eliminarProyecto(params.id);
        Swal.fire("Eliminado!", "Tu proyecto ha sido Eliminado.", "success");
      }
    });
  };

  const { nombre } = proyecto;
  if (cargando) return  <Spinner />;

  return (
    <>
      <div className="flex justify-between">
        <h1 className="font-black text-4xl">Editar Proyecto: {nombre}</h1>

        <div className="flex items-center gap-2 text-gray-400 hover:text-black">
          <button
            className="bg-red-700 text-white border-b p-3 flex md:flex-row justify-center text-center items-center rounded-lg hover:bg-red-800 uppercase font-bold transition-colors"
            onClick={handleClick}
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

      <div className="mt-10 flex justify-center">
        <FormularioProyecto />
      </div>
    </>
  );
};

export default EditarProyecto;
