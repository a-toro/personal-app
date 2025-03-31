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

export default function RegisterForm() {
  return (
    <Card className="w-full sm:w-[380px]">
      <CardHeader>
        <CardTitle className="text-2xl text-center">Crear una cuenta</CardTitle>
        <CardDescription>
          Crea una cuenta para llevar el control de tus gastos
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-y-3">
        <div className="w-full space-y-2">
          <Label htmlFor="name">Email</Label>
          <Input placeholder="Ingresa tu email" id="email" />
        </div>

        {/* <div className="w-full space-y-2">
          <Label htmlFor="name">Contraseña</Label>
          <Input placeholder="Nombre" id="name" />
        </div> */}

        {/* <div className="w-full space-y-2">
          <Label htmlFor="name">Confirmar Contraseña</Label>
          <Input placeholder="Nombre" id="name" />
        </div> */}
      </CardContent>
      <CardFooter className="flex flex-col w-full gap-y-4">
        <Button className="w-full">Registrarme</Button>
        <p className="text-sm text-slate-400 hover:text-slate-700">
          ¿Olvido su Contraseña?
        </p>
      </CardFooter>
    </Card>
  );
}
