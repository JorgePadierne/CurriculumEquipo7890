import { useState } from "react";
import axios from "axios";

function Correos() {
  const [textoInput, setTextoInput] = useState("");
  const [usuarios, setUsuarios] = useState("");

  const MiAxios = axios.create({
    baseURL: "http://localhost:5150",
    timeout: 10000,
    headers: {
      "Content-Type": "application/json",
    },
  });

  const fetchData = async (textoInput) => {
    try {
      const response = await MiAxios.get(
        `/api/usuario/buscar@?email=${textoInput}`
      );
      setUsuarios(response.data);
    } catch (error) {
      console.error(
        "Error en la petición:",
        error.response?.data || error.message
      );
    }
  };

  const handleInputChange = (event) => {
    setTextoInput(event.target.value);
  };

  const handleButtonClick = () => {
    fetchData(textoInput);
  };

  return (
    <section>
      <h2>Buscar Correos</h2>
      <input
        type="text"
        value={textoInput}
        onChange={handleInputChange}
        placeholder="Escribe algo"
      />
      <button onClick={handleButtonClick}>Buscar</button>

      <span>{usuarios}</span>
    </section>
  );
}
export default Correos;
