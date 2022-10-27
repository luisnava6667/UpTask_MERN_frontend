import { formatearFecha } from "../helpers/formatearFecha";
import useProyectos from "../hooks/useProyectos";
import useAdmin from "../hooks/useAdmin";

const Tarea = ({ tarea }) => {
  const { handleModalEditarTarea, handleModalEliminarTarea, completarTarea } =
    useProyectos();
  const admin = useAdmin();

  const { descripcion, nombre, prioridad, fechaEntrega, estado, _id } = tarea;

  return (
    <div className="border-b p-5 flex justify-between items-center">
      <div className="flex flex-col  items-start">
        <p className="mb-1 text-xl">{nombre}</p>
        <p className="mb-1 text-sm text-gray-500 uppercase">{descripcion}</p>
        <p className="mb-1 text-sm">{formatearFecha(fechaEntrega)}</p>
        <p className="mb-1 text-gray-600">
          Prioridad:{" "}
          <span className={`${prioridad === "Baja" && "bg-green-900"} ${prioridad === "Media" && "bg-amber-400"} ${prioridad === "Alta" && "bg-red-800"}  text-white p-1 uppercase rounded-lg font-bold`}>
            {prioridad}
          </span>
        </p>
        {estado && (
          <p className="text-xs bg-green-600 uppercase p-1 rounded-lg text-white">
            Completada por: {tarea.completado.nombre}
          </p>
        )}
      </div>

      <div className="flex flex-col lg:flex-row gap-2">
        {admin && (
          <button
            className="bg-indigo-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg transition-colors hover:bg-indigo-800"
            onClick={() => handleModalEditarTarea(tarea)}
          >
            Editar
          </button>
        )}

        <button
          className={`${
            estado
              ? "bg-sky-600 transition-colors hover:bg-sky-800"
              : "bg-gray-600 transition-colors hover:bg-gray-800"
          } px-4 py-3 text-white uppercase font-bold text-sm rounded-lg`}
          onClick={() => completarTarea(_id)}
        >
          {estado ? "Completa" : "Incompleta"}
        </button>

        {admin && (
          <button
            className="bg-red-600 px-4 py-3 transition-colors hover:bg-red-800 text-white uppercase font-bold text-sm rounded-lg "
            onClick={() => handleModalEliminarTarea(tarea)}
          >
            Eliminar
          </button>
        )}
      </div>
    </div>
  );
};

export default Tarea;
