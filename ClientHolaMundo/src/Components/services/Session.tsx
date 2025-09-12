import { useForm } from "react-hook-form";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Input, Button, Label } from "../ui";
import { useAuth } from "../../hooks/useAuth";
import { ToastContainer, toast } from "react-toastify";

export default function Session() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);

  // Obtener la ruta de donde venía el usuario antes del login
  const from = location.state?.from?.pathname || "/list";

  const logUsers = handleSubmit(async (data) => {
    setIsLoading(true);

    try {
      const result = await login(data.Email, data.Password);
      setTimeout(() => {
        if (result.success) {
          // Redirigir a la página de donde venía o a la página principal
          toast.success("Sesion iniciada", {
            position: "bottom-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          navigate(from, { replace: true });
        } else {
          toast.error("Error al inicar sesion", {
            position: "bottom-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
      }, 2000);
    } catch (error) {
      toast.error("Error al inicar sesion", {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      console.error("Error en login:", error);
    } finally {
      setIsLoading(false);
    }
  });

  return (
    <>
      <ToastContainer />
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={logUsers}>
            <div>
              <Label htmlFor="Email">Email address</Label>
              <div className="mt-2">
                <Input
                  id="Email"
                  type="Email"
                  placeholder="correo@gmail.com"
                  disabled={isLoading}
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
                  disabled={isLoading}
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
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Iniciando sesión..." : "Sign in"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
