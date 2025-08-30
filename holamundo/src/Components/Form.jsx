import { useForm } from "react-hook-form";
import axios from "axios";
import { useEffect, useState } from "react";

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
    const { password2, ...filteredData } = data;
    try {
      const req = await MiAxios.post("/api", filteredData);
      console.log(req.data);
    } catch (error) {
      console.error(
        "Error en la petición:",
        error.response?.data || error.message
      );
    }
  });
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await MiAxios.get("/api/users");
        console.log(response.data);
      } catch (error) {
        console.error(
          "Error fetching users:",
          error.response?.data || error.message
        );
      }
    };
    fetchData();
  }, []);
  return (
    <>
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
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          {...register("email", {
            required: {
              value: true,
              message: "Email is required",
            },
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: "Invalid email address",
            },
          })}
        />
        {errors.email && <span>{errors.email.message}</span>}
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
      <section>
        <h2>Users</h2>
      </section>
    </>
  );
}

export default Form;
