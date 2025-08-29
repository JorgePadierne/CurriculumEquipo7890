import { useForm } from "react-hook-form";
import axios from "axios";

function Form() {
  const MiAxios = axios.create({
    baseURL: "",
    timeout: 1000,
    headers: { "X-Custom-Header": "foobar" },
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const onSubmit = handleSubmit(async (data) => {
    try {
      const req = await MiAxios.post("/api", data);
      console.log(req.data);
    } catch (error) {
      console.error(
        "Error en la petición:",
        error.response?.data || error.message
      );
    }
  });
  return (
    <form className="form" onSubmit={onSubmit}>
      <label htmlFor="user">User</label>
      <input
        id="user"
        type="text"
        {...register("user", {
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
      {errors.user && <span>{errors.user.message}</span>}
      <label htmlFor="password">Password</label>
      <input
        id="password"
        type="password"
        {...register("password", {
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
      {errors.password && <span>{errors.password.message}</span>}
      <label htmlFor="password2">Confirm Password</label>
      <input
        id="password2"
        type="password"
        {...register("password2", {
          validate: (value) =>
            value === watch("password") || "Passwords do not match",
        })}
      />
      {errors.password2 && <span>{errors.password2.message}</span>}

      <button type="submit">Send</button>
    </form>
  );
}

export default Form;
