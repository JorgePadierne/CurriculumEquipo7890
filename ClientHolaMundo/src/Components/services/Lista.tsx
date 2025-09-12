import axios from "axios";
import { useState, useEffect, useCallback } from "react";
import { Label, Input, Button } from "../ui";
import { ToastContainer, toast } from "react-toastify";

// Mover la instancia de axios fuera del componente para evitar recreación
const MiAxios = axios.create({
  baseURL: "https://curriculumequipo7890.onrender.com",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default function Lista() {
  type item = {
    id: number;
    tarea: string;
    descripcion: string;
  };

  interface InputChangeEvent {
    target: { value: string };
  }
  const [lista, setLista] = useState([]);
  const [tarea, setTarea] = useState("");
  const [description, setDescripcion] = useState("");

  const fetchData = useCallback(async () => {
    try {
      const response = await MiAxios.get("/api2/Lista/RecibirTareas");
      console.log(response.data);
      setLista(response.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(
          "Error en la petición:",
          error.response?.data || error.message
        );
      } else {
        console.error("Error en la petición:", String(error));
      }
    }
  }, []); // Eliminar MiAxios de las dependencias ya que ahora es constante

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const onChange = (e: InputChangeEvent) => {
    setTarea(e.target.value);
  };
  const onChangeDes = (e: InputChangeEvent) => {
    setDescripcion(e.target.value);
  };

  const onSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      await MiAxios.post("/api2/Lista/AgregarTarea", {
        Tarea: tarea,
        Descripcion: description,
      });

      toast.success("Usuario creado correctamente", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(
          "Error en la petición:",
          error.response?.data || error.message
        );
        toast.error("Error al agregar tarea", {
          position: "bottom-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else {
        console.error("Error en la petición:", String(error));
        toast.error("Error al agregar tarea", {
          position: "bottom-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    }
    fetchData();
    setTarea("");
  };

  const eliminar = async (id: number) => {
    try {
      await MiAxios.delete(`/api2/Lista/EliminarTareas/${id}`);
      toast.success("Tarea eliminada", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (error) {
      console.error(error);
      toast.error("Error al eliminar la tarea", {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
    fetchData();
  };

  return (
    <>
      <ToastContainer />
      <div className="mt-20 sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="text-center text-2xl font-bold text-gray-900 mb-6">
          Lista de Tareas
        </h2>

        <form onSubmit={onSubmit} className="mb-6">
          <div className="mb-4">
            <Label htmlFor="Tarea">Task List</Label>
          </div>
          <Input
            id="Tarea"
            type="text"
            value={tarea}
            onChange={onChange}
            placeholder="type a new task..."
          />
          <div className="mb-4">
            <Label htmlFor="Descripcion">Description</Label>
          </div>
          <Input
            id="Descripcion"
            type="text"
            value={description}
            onChange={onChangeDes}
            placeholder="type a new task..."
          />
          <div className=" mt-5">
            <Button type="submit">Add Task</Button>
          </div>
        </form>

        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-gray-900">Tareas:</h3>
          {lista.length === 0 ? (
            <p className="text-gray-500 text-center py-4">No task found</p>
          ) : (
            <div className="space-y-2">
              {lista.map((item: item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border"
                >
                  <h2>{item.tarea}</h2>
                  <p>{item.descripcion}</p>
                  <Button onClick={() => eliminar(item.id)}>Eliminar</Button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
