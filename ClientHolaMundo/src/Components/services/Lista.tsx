import axios from "axios";
import { useState, useEffect, useCallback } from "react";
import { Label, Input, Button } from "../ui";

export default function Lista() {
  type item = {
    Id: number;
    Tarea: string;
    Description: string;
  };

  interface InputChangeEvent {
    target: { value: string };
  }
  const [lista, setLista] = useState([]);
  const [tarea, setTarea] = useState("");
  const [description, setDescripcion] = useState("");
  const MiAxios = axios.create({
    baseURL: "http://localhost:5290",
    timeout: 10000,
    headers: {
      "Content-Type": "application/json",
    },
  });

  const fetchData = useCallback(async () => {
    try {
      const response = await MiAxios.get("/api2/lista/recibirtarea");
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
  }, [MiAxios]);

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
        tarea,
        description,
      });
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
    fetchData();
    setTarea("");
  };

  const eliminar = async (id: number) => {
    try {
      await MiAxios.delete(`/api2/Lista/Eliminartareas/${id}`);
    } catch (error) {
      console.error(error);
    }
    fetchData();
  };

  return (
    <>
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
            <Label htmlFor="Description">Description</Label>
          </div>
          <Input
            id="Description"
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
                  key={item.Id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border"
                >
                  <h2>{item.Tarea}</h2>
                  <p>{item.Description}</p>
                  <Button onClick={() => eliminar(item.Id)}>Eliminar</Button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
