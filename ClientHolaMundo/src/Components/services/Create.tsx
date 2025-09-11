import { useForm } from "react-hook-form";
import axios from "axios";
import { Input, Label, Button } from "../ui";
import { ToastContainer, toast } from "react-toastify";

export default function Example() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const MiAxios = axios.create({
    baseURL: "https://curriculumequipo7890.onrender.com",
    timeout: 10000,
    headers: {
      "Content-Type": "application/json",
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    try {
      await MiAxios.post("/api/usuario/agregar", data);
      toast.success("Usuario creado correctamente", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error("Error al crear usuario", {
          position: "bottom-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        console.error(
          "Error en la petición:",
          error.response?.data || error.message
        );
      } else {
        toast.error("Error al crear usuario", {
          position: "bottom-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        console.error("Error en la petición:", String(error));
      }
    }
  });

  return (
    <>
      <ToastContainer />
      <div
        className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8"
        id="content"
      >
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            Create Your Account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={onSubmit}>
            <div>
              <Label htmlFor="Nombre">User</Label>
              <div className="mt-2">
                <Input
                  id="Nombre"
                  type="text"
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
                  <span className="text-red-500 text-sm">
                    {errors.Nombre.message}
                  </span>
                )}
              </div>
            </div>
            <div>
              <Label htmlFor="Email">Email address</Label>
              <div className="mt-2">
                <Input
                  id="Email"
                  type="Email"
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
                  <span className="text-red-500 text-sm">
                    {errors.Email.message}
                  </span>
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
                    <span className="text-red-500 text-sm">
                      {errors.Password.message}
                    </span>
                  )}
              </div>
            </div>
            <div>
              <Button type="submit">Create</Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
