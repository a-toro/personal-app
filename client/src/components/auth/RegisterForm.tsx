import { useState } from "react";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useFormik } from "formik";
// import * as Yup from "yup";

import { Eye, EyeOff } from "lucide-react";
import axios from "@/api/axios";
import { useLocation, useNavigate } from "react-router";
import { useAuth } from "@/hooks/useAuth";

const REGISTER_PATH = "/auth/register";
const LOGIN_PATH = "/auth/login";

export default function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const { setAuth } = useAuth();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    // validationSchema: {},
    onSubmit: async (values) => {
      try {
        const createUser = {
          name: values.name,
          email: values.email,
          password: values.password,
        };
        const response = await axios.post(REGISTER_PATH, createUser);

        if (response.status === 201) {
          const loginUser = {
            email: values.email,
            password: values.password,
          };
          const loginResponse = await axios.post(LOGIN_PATH, loginUser, {
            withCredentials: true,
          });

          if (loginResponse.status === 200) {
            const {
              email: userEmail,
              id: userId,
              role,
            } = loginResponse.data?.data || {};

            const accessToken = loginResponse.data?.accessToken;

            setAuth({
              user: { email: userEmail, id: userId, role },
              accessToken,
            });

            navigate("/", { state: { from: location }, replace: true });
          }

          console.log({ loginResponse });
        }
        alert("Usuario no creado");
      } catch (error) {
        console.error(error);
      }
    },
  });
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl text-center">Crear una cuenta</CardTitle>
        <CardDescription>
          Crea una cuenta para llevar el control de tus gastos
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="flex flex-col gap-y-3" onSubmit={formik.handleSubmit}>
          <div className="w-full space-y-2">
            <Label htmlFor="name">Nombre</Label>
            <Input
              placeholder="Ingresa tu nombre completo"
              id="name"
              name="name"
              type="text"
              required
              value={formik.values.name}
              onChange={formik.handleChange}
            />
          </div>
          <div className="w-full space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              placeholder="Ingresa tu email"
              id="email"
              name="email"
              type="email"
              required
              value={formik.values.email}
              onChange={formik.handleChange}
            />
          </div>

          <div className="w-full space-y-2">
            <Label htmlFor="password">Contraseña</Label>
            <div className="flex items-center gap-1">
              <Input
                placeholder="Ingresa tu contraseña"
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={formik.values.password}
                onChange={formik.handleChange}
              />
              <Button
                type="button"
                variant="outline"
                size={"icon"}
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? <EyeOff /> : <Eye />}
              </Button>
            </div>
          </div>

          <div className="w-full space-y-2">
            <Label htmlFor="name">Confirmar Contraseña</Label>
            <div className="flex items-center gap-1">
              <Input
                placeholder="Confirma tu contraseña"
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
              />
              <Button
                type="button"
                variant="outline"
                size={"icon"}
                onClick={() => setShowConfirmPassword((prev) => !prev)}
              >
                {showConfirmPassword ? <EyeOff /> : <Eye />}
              </Button>
            </div>
          </div>
          <Button type="submit" className="w-full mt-2">
            Registrarme
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col w-full gap-y-4">
        <p className="text-sm text-slate-400 hover:text-slate-700">
          ¿Olvido su Contraseña?
        </p>
      </CardFooter>
    </Card>
  );
}
