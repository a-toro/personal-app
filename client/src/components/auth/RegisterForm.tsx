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

export default function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    // validationSchema: {},
    onSubmit: (values) => {
      console.log({ values });
    },
  });
  return (
    <Card className="w-full sm:w-[380px]">
      <CardHeader>
        <CardTitle className="text-2xl text-center">Crear una cuenta</CardTitle>
        <CardDescription>
          Crea una cuenta para llevar el control de tus gastos
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
