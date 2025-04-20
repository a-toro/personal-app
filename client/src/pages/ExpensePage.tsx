import { Button } from "@/components/ui/button";
// import {
//   DropdownMenu,
//   DropdownMenuCheckboxItem,
//   DropdownMenuContent,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
import { Download, Plus } from "lucide-react";

export default function ExpensePage() {
  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-bold mb-6">Registro de gastos</h1>
      <div>Cards</div>
      <div className="flex sm:justify-between flex-wrap flex-col gap-2 sm:flex-row">
        <div className="flex gap-2 flex-col sm:flex-row">
          <Button size={"sm"} className="w-full sm:w-auto">
            <Plus className="mr-2 size-4" />
            Nuevo registro
          </Button>
          <Button variant={"outline"} size={"sm"} className="w-full sm:w-auto">
            <Download className="mr-2 size-4" />
            Descargar
          </Button>
        </div>
        {/* <div className="flex w-full sm:w-auto">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-full sm:w-auto">
                Columnas
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-full">
              {[1, 2, 3, 4, 5].map((column, index) => (
                <DropdownMenuCheckboxItem
                  key={index}
                  // checked={column.isVisible}
                  // onCheckedChange={() => toggleColumnVisibility(column.id)}
                >
                  {"Test " + index}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div> */}
      </div>
      <div>Table</div>
      <div>Paginación</div>
    </div>
  );
}
