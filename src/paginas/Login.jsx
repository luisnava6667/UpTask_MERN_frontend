import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Alerta from "../components/Alerta";
import clienteAxios from "../config/clienteAxios";
import useAuth from "../hooks/useAuth";
import Swal from "sweetalert2";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alerta, setAlerta] = useState({});

  const { setAuth } = useAuth();

  const navigate = useNavigate();

  const handleBlur = () => {
    if (!email.includes("@")&&!email.includes(".")) {
      setAlerta({
        msg: "El email no es válido",
        error: true,
      });
      setTimeout(() => {
        setAlerta({});
      }, 2000);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if ([email, password].includes("")) {
      setAlerta({
        msg: "Todos los campos son obligatorios",
        error: true,
      });
      return;
    }

    try {
      const { data } = await clienteAxios.post("/usuarios/login", {
        email,
        password,
      });
      setAlerta({});
      localStorage.setItem("token", data.token);
      setAuth(data);
      Swal.fire({
        icon: 'success',
        title: "Iniciando Sesión...",
        text: "Bienvenido",
        showConfirmButton: false,
        onBeforeOpen: () => {
          Swal.showLoading();
        },
      });
      setTimeout(()=>{
          Swal.close();     
          navigate("/proyectos");
      },3000);
    } catch (error) {
        const msg = error.response.data.msg
        Swal.fire({           
            icon: 'error',
            title: `${msg}`,
          })
    
    }
  };
const handleChange = (e) => {
    
  }
  const { msg } = alerta;

  return (
    <>
      <h1 className="text-sky-600 font-black text-6xl capitalize">
        Inicia sesión y administra tus {""}
        <span className="text-slate-700">proyectos</span>
      </h1>

      <form
        className="my-10 bg-white shadow rounded-lg p-10"
        onSubmit={handleSubmit}
      >
        <div className="my-5">
          <label
            className="uppercase text-gray-600 block text-xl font-bold"
            htmlFor="email"
          >
            Email
          </label>
          <input
            id="email"
            type="text"
            placeholder="Email de Registro"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
            value={email}
            onBlur={handleBlur}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="my-5">
          <label
            className="uppercase text-gray-600 block text-xl font-bold"
            htmlFor="password"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="Password de Registro"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <input
          type="submit"
          value="Iniciar Sesión"
          className="bg-sky-700 mb-5 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors"
        />
        {msg && <Alerta alerta={alerta} />}
      </form>

      <nav className="lg:flex lg:justify-between">
        <Link
          className="block text-center my-5 text-slate-500 uppercase text-sm"
          to="/registrar"
        >
          ¿No tienes una cuenta? Regístrate
        </Link>

        <Link
          className="block text-center my-5 text-slate-500 uppercase text-sm"
          to="/olvide-password"
        >
          Olvide Mi Password
        </Link>
      </nav>
    </>
  );
};

export default Login;
