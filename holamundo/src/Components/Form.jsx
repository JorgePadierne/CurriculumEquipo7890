import { useForm } from "react-hook-form";
import axios from "axios";

function Form() {
  const MiAxios = axios.create({
    baseURL: "http://localhost:5150",
    timeout: 10000,
    headers: {
      "Content-Type": "application/json",
    },
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const onSubmit = handleSubmit(async (data) => {
    const { password2, ...filteredData } = data;
    try {
      await MiAxios.post("/api/usuario/agregar", filteredData);
    } catch (error) {
      console.error(
        "Error en la petición:",
        error.response?.data || error.message
      );
    }
  });

  return (
    <>
      <form className="form" onSubmit={onSubmit}>
        <h2>Creación de Usuario</h2>
        <label htmlFor="User">User</label>
        <input
          id="User"
          type="text"
          placeholder="Yasuo123"
          {...register("User", {
            required: {
              value: true,
              message: "User is required",
            },
            minLength: {
              value: 4,
              message: "Min length is 4",
            },
            maxLength: {
              value: 12,
              message: "Max length is 12",
            },
          })}
        />
        {errors.User && <span>{errors.User.message}</span>}
        <label htmlFor="Email">Email</label>
        <input
          id="Email"
          type="Email"
          placeholder="sorieketon@gmail.com"
          {...register("Email", {
            required: {
              value: true,
              message: "Email is required",
            },
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: "Invalid Email address",
            },
          })}
        />
        {errors.Email && <span>{errors.Email.message}</span>}
        <label htmlFor="Password">Password</label>
        <input
          id="Password"
          type="Password"
          placeholder="********"
          {...register("Password", {
            required: {
              value: true,
              message: "Password is required",
            },
            minLength: {
              value: 8,
              message: "Min length is 8",
            },
            maxLength: {
              value: 12,
              message: "Max length is 12",
            },
          })}
        />
        {errors.Password && <span>{errors.Password.message}</span>}
        <label htmlFor="password2">Confirm Password</label>
        <input
          id="password2"
          type="Password"
          placeholder="********"
          {...register("password2", {
            validate: (value) =>
              value === watch("Password") || "Passwords do not match",
          })}
        />
        {errors.password2 && <span>{errors.password2.message}</span>}

        <button type="submit">Send</button>
      </form>
    </>
  );
}
export default Form;
