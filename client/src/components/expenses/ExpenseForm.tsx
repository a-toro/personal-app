import { Input } from "../ui/input";
import { Label } from "../ui/label";

export function ExpenseForm() {
  return (
    <form>
      <h2 className="text-xl font-semibold">Registrar gasto</h2>
      <h3 className="text-sm mb-4 text-gray-500">
        Registra tus gastos a través del siguiente formulario.
      </h3>
      <div className="grid gap-4">
        <div className="grid gap-3">
          <Label htmlFor="name-1">Name</Label>
          <Input id="name-1" name="name" defaultValue="Pedro Duarte" />
        </div>
        <div className="grid gap-3">
          <Label htmlFor="username-1">Username</Label>
          <Input id="username-1" name="username" defaultValue="@peduarte" />
        </div>
      </div>
    </form>
  );
}
