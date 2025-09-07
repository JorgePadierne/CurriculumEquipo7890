import { useState } from "react";
import axios from "axios";

function Usuarios() {
  interface InputChangeEvent {
    target: { value: string };
  }
  const [textoInput, setTextoInput] = useState<string>("");
  const [usuarios, setUsuarios] = useState<string>("");

  const MiAxios = axios.create({
    baseURL: "http://localhost:5150",
    timeout: 10000,
    headers: {
      "Content-Type": "application/json",
    },
  });

  const fetchData = async (textoInput: string) => {
    try {
      const response = await MiAxios.get(
        `/api/usuario/buscar?user=${textoInput}`
      );
      setUsuarios(response.data);
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
  };

  const handleInputChange = (event: InputChangeEvent): void => {
    setTextoInput(event.target.value);
  };

  return (
    <section className="usuarios">
      <h2>Buscador de usuarios</h2>
      <input
        type="text"
        value={textoInput}
        onChange={handleInputChange}
        placeholder="Escribe algo"
      />
      <button onClick={() => fetchData(textoInput)}>Buscar</button>

      <span>{usuarios}</span>
    </section>
  );
}
export default Usuarios;
