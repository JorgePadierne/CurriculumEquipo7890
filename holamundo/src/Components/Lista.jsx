import axios from "axios";
import { useState, useEffect } from "react";

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

  const fetchData = async () => {
    try {
      const response = await MiAxios.get("/ToDoList/Lista/VerTareas");
      setLista(response.data);
    } catch (error) {
      console.error(
        "Error en la petición:",
        error.response?.data || error.message
      );
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

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
      await MiAxios.delete(`/ToDoList/Lista/EliminarTarea/${id}`);
      fetchData();
    } catch (error) {
      console.error(error);
    }
  };

  const patchData = async (id, realizada, tarea) => {
    try {
      await MiAxios.patch("/api/usuarios/actualizar", {
        id,
        realizada: true,
        tarea,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {lista.map((item) => (
        <div key={item.id}>
          <h2>{item.tarea}</h2>
          <span>{item.realizada}</span>
          <button onClick={eliminar(item.id)}>Eliminar</button>
        </div>
      ))}

      <form onSubmit={onSubmit} className="form">
        <label htmlFor="tarea">Agregar Tarea</label>
        <input
          type="text"
          name="tarea"
          id="tarea"
          placeholder="Jugar lol"
          onChange={onChange}
        />
        <button type="submit">Add</button>
      </form>
    </>
  );
}
