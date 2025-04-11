import { Button } from "../ui/button";
import { Trash2 } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Category } from "./ExpenseCategoryForm";
import { AxiosError } from "axios";
import { useSnackbar } from "notistack";
import { useAxiosPrivate } from "@/hooks/useAxiosPrivate";
import { ApiPaths } from "@/lib/routerPaths";
import { useState } from "react";

interface ExpenseCategoryDeleteButtonProps {
  category: Category;
  onReload?: () => void;
}

export default function ExpenseCategoryDeleteButton({
  category,
  onReload,
}: ExpenseCategoryDeleteButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const axiosPrivate = useAxiosPrivate();

  const { enqueueSnackbar } = useSnackbar();
  const deleteCategory = async function () {
    try {
      const response = await axiosPrivate.delete(
        `${ApiPaths.expenseCategory}/${category.id}`
      );

      if (response.status === 204) {
        enqueueSnackbar("Registro eliminado", { variant: "success" });
        if (onReload instanceof Function) onReload();
        return;
      }

      enqueueSnackbar("Error al intentar eliminar el registro", {
        variant: "error",
      });
    } catch (err) {
      const error = err as AxiosError<{ message?: string }>;

      if (error?.response?.data?.message) {
        enqueueSnackbar(error?.response?.data?.message, { variant: "error" });
      } else {
        enqueueSnackbar("Ha ocurrido un error", { variant: "error" });
      }
    }
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="text-destructive"
          //   onClick={() => handleDeleteCategory(category.id)}
        >
          <Trash2 className="h-4 w-4" />
          <span className="sr-only">Eliminar</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-auto overflow-hidden flex flex-col gap-2"
        align="end"
      >
        <p>¿Eliminar registro?</p>
        <div className="space-x-2">
          <Button onClick={deleteCategory} variant={"destructive"}>
            Eliminar
          </Button>
          <Button onClick={() => setIsOpen(false)} variant={"outline"}>
            Cancelar
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
