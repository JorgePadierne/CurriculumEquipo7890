import axios from "axios";
import { useState, useEffect, useCallback } from "react";

export default function Lista() {
  type item = {
    id: number;
    realizada: boolean;
    tarea: string;
  };

  interface InputChangeEvent {
    target: { value: string };
  }
  const [lista, setLista] = useState([]);
  const [tarea, setTarea] = useState("");
  const MiAxios = axios.create({
    baseURL: "http://localhost:5150",
    timeout: 10000,
    headers: {
      "Content-Type": "application/json",
    },
  });

  const fetchData = useCallback(async () => {
    try {
      const response = await MiAxios.get("/ToDoList/Lista/VerTareas");
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

  const onSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      await MiAxios.post("/ToDoList/Lista/AgregarTarea", { tarea });
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
      await MiAxios.delete(`/ToDoList/Lista/Eliminar/${id}`);
    } catch (error) {
      console.error(error);
    }
    fetchData();
  };

  return (
    <div className="lista-container">
      <div className="formulario-tarea">
        <form onSubmit={onSubmit} className="form content-form">
          <h2>Agregar Tarea</h2>
          <input
            type="text"
            name="tarea"
            id="tarea"
            placeholder="Jugar lol"
            onChange={onChange}
            value={tarea}
          />
          <button type="submit">Add</button>
        </form>
      </div>
      <div className="tareas-container">
        <h3 className="tareas-titulo">Lista de Tareas</h3>
        <div className="lista">
          {lista.map((item: item) => (
            <div key={item.id} className="tarea">
              <h4>{item.tarea}</h4>
              <span className="estado-tarea">
                {item.realizada ? "Completada" : "Pendiente"}
              </span>
              <button onClick={() => eliminar(item.id)}>Eliminar</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
