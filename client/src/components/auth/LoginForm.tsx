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
import { useSnackbar } from "notistack";

const LOGIN_PATH = "/auth/login";

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const { setAuth } = useAuth();

  const { enqueueSnackbar } = useSnackbar();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    // validationSchema: {},
    onSubmit: async (values) => {
      try {
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
            name: userName,
          } = loginResponse.data?.data || {};

          const accessToken = loginResponse.data?.accessToken;

          setAuth({
            user: { email: userEmail, id: userId, role, name: userName },
            accessToken,
          });

          enqueueSnackbar(`Bienvenido ${userName}`);

          navigate("/", { state: { from: location }, replace: true });
        }

        console.log({ loginResponse });
      } catch (error) {
        console.error(error);
      }
    },
  });
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl text-center">
          Ingresa a tu cuenta
        </CardTitle>
        <CardDescription>
          Lleva el control de tus gastos en todo momento
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="flex flex-col gap-y-3" onSubmit={formik.handleSubmit}>
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
          <Button type="submit" className="w-full mt-2">
            Ingresar
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col w-full gap-y-4">
        {/* <p className="text-sm text-slate-400 hover:text-slate-700">
          ¿Olvido su Contraseña?
        </p> */}
      </CardFooter>
    </Card>
  );
}
