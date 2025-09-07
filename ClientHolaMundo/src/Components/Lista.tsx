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
    <div className="content-lista-tarea">
      <form onSubmit={onSubmit} className="form content-form form-tarea">
        <h2>Agregar Tarea</h2>
        <input
          type="text"
          name="tarea"
          id="tarea"
          placeholder="Jugar lol"
          onChange={onChange}
        />
        <button type="submit">Add</button>
      </form>
      <section className="lista">
        {lista.map((item: item) => (
          <div key={item.id} className="tarea">
            <h2>{item.tarea}</h2>
            <span>{item.realizada}</span>
            <button onClick={() => eliminar(item.id)}>Eliminar</button>
          </div>
        ))}
      </section>
    </div>
  );
}
