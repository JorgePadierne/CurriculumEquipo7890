import axios from "axios";
import { useState, useEffect, useCallback } from "react";

export default function Lista() {
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
      console.error(
        "Error en la petición:",
        error.response?.data || error.message
      );
    }
  }, [MiAxios]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const onChange = (e) => {
    setTarea(e.target.value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await MiAxios.post("/ToDoList/Lista/AgregarTarea", { tarea });
      fetchData();
    } catch (error) {
      console.error(
        "Error en la petición:",
        error.response?.data || error.message
      );
    }
  };

  const eliminar = async (id) => {
    try {
      await MiAxios.delete(`/ToDoList/Lista/Eliminar/${id}`);
      fetchData();
    } catch (error) {
      console.error(error);
    }
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
        {lista.map((item) => (
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
