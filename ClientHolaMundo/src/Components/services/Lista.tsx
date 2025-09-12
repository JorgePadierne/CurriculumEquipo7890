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
      console.log("Datos recibidos del backend:", response.data);
      console.log("Tipo de datos:", typeof response.data);
      console.log("Es array:", Array.isArray(response.data));
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
    setDescripcion("");
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
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-2xl mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              📋 Lista de Tareas
            </h1>
            <p className="text-gray-600">Organiza y gestiona tus tareas diarias</p>
          </div>

        <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Agregar Nueva Tarea</h3>
          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <Label htmlFor="Tarea" className="block text-sm font-medium text-gray-700 mb-2">
                Título de la Tarea
              </Label>
              <Input
                id="Tarea"
                type="text"
                value={tarea}
                onChange={onChange}
                placeholder="Escribe el título de tu tarea..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
            </div>
            <div>
              <Label htmlFor="Descripcion" className="block text-sm font-medium text-gray-700 mb-2">
                Descripción
              </Label>
              <Input
                id="Descripcion"
                type="text"
                value={description}
                onChange={onChangeDes}
                placeholder="Describe los detalles de la tarea..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
            </div>
            <div className="pt-2">
              <Button 
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 shadow-sm hover:shadow-md"
              >
                Agregar Tarea
              </Button>
            </div>
          </form>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-full mr-2">
              {lista.length}
            </span>
            Tareas Pendientes
          </h3>
          {lista.length === 0 ? (
            <div className="bg-gray-50 rounded-xl p-8 text-center border-2 border-dashed border-gray-300">
              <div className="text-gray-400 text-4xl mb-4">📝</div>
              <p className="text-gray-500 text-lg font-medium mb-2">No hay tareas pendientes</p>
              <p className="text-gray-400 text-sm">¡Agrega tu primera tarea usando el formulario de arriba!</p>
            </div>
          ) : (
            <div className="space-y-3">
              {lista.map((item: item) => {
                console.log("Item actual:", item);
                console.log("Tarea:", item.tarea);
                console.log("Descripcion:", item.descripcion);
                return (
                  <div
                    key={item.id}
                    className="bg-white rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-300 p-4 mb-3"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1 mr-4">
                        <h3 className="text-lg font-bold text-gray-800 mb-2 leading-tight">
                          {item.tarea}
                        </h3>
                        <p className="text-gray-600 text-sm leading-relaxed">
                          {item.descripcion}
                        </p>
                      </div>
                      <div className="flex-shrink-0">
                        <Button 
                          onClick={() => eliminar(item.id)}
                          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors duration-200 shadow-sm hover:shadow-md"
                        >
                          Eliminar
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
        </div>
      </div>
    </>
  );
}
