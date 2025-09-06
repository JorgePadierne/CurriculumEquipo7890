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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await MiAxios.get("/api/usuario/listar");
        setLista(response.data);
      } catch (error) {
        console.error(
          "Error en la petición:",
          error.response?.data || error.message
        );
      }
    };
    fetchData();
  });

  const onChange = (e) => {
    setTarea(e.target.value);
  };

  const onSubmit = async (e) => {
    console.log(tarea);
    e.preventDefault();
    try {
      await MiAxios.post("/api/usuarios/agregar", { tarea });
    } catch (error) {
      console.error(
        "Error en la petición:",
        error.response?.data || error.message
      );
    }
  };

  const eliminar = async (id) => {
    try {
      await MiAxios.delete("/api/usuario/eliminar", { id });
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
          <h2>item.tarea</h2>
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
