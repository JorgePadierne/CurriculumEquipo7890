import { useForm } from "react-hook-form";
import axios from "axios";
import Input from "./ui/Input";
import Label from "./ui/Label";

export default function Example() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const MiAxios = axios.create({
    baseURL: "http://localhost:5290",
    timeout: 10000,
    headers: {
      "Content-Type": "application/json",
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    try {
      await MiAxios.post("/api/usuario/agregar", data);
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
  });

  return (
    <>
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            Create Your Acoount
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={onSubmit}>
            <div>
              <Label htmlFor="Nombre">User</Label>
              <div className="mt-2">
                <Input
                  id="Nombre"
                  type="Nombre"
                  required
                  autoComplete="Nombre"
                  placeholder="Jorge"
                  {...register("Nombre", {
                    required: {
                      value: true,
                      message: "Nombre is required",
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
                {typeof errors.Nombre?.message === "string" && (
                  <span>{errors.Nombre.message}</span>
                )}
              </div>
            </div>
            <div>
              <Label htmlFor="Email">Email address</Label>
              <div className="mt-2">
                <Input
                  id="Email"
                  type="Email"
                  required
                  autoComplete="Email"
                  placeholder="correo@gmail.com"
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
                {errors.Email && typeof errors.Email.message === "string" && (
                  <span>{errors.Email.message}</span>
                )}
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <Label htmlFor="Password">Password</Label>
              </div>
              <div className="mt-2">
                <Input
                  id="Password"
                  type="Password"
                  required
                  autoComplete="current-Password"
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
                {errors.Password &&
                  typeof errors.Password.message === "string" && (
                    <span>{errors.Password.message}</span>
                  )}
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Create
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
