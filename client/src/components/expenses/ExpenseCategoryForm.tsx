import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Plus } from "lucide-react";
import { Button } from "../ui/button";
import { ApiPaths } from "@/lib/routerPaths";
import { useAxiosPrivate } from "@/hooks/useAxiosPrivate";
import { useSnackbar } from "notistack";
import { AxiosError } from "axios";

interface Category {
  id: string;
  name: string;
}
interface ExpenseCategoryFormProps {
  category?: Category;
}

interface FormState {
  [key: string]: {
    value?: string;
    error?: string | null | undefined;
  };
}

export default function ExpenseCategoryForm({
  category,
}: ExpenseCategoryFormProps) {
  const [formData, setFormData] = useState<FormState | null>(() =>
    category
      ? {
          name: {
            value: category.name,
            error: null,
          },
        }
      : null
  );
  const { enqueueSnackbar } = useSnackbar();

  const axiosPrivate = useAxiosPrivate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (!category) {
        if (formData?.name?.value) {
          const response = await axiosPrivate.post(ApiPaths.expenseCategory, {
            name: formData.name.value,
          });

          if (response.status === 201) {
            enqueueSnackbar("Registro exitoso", { variant: "success" });
            return;
          }
          enqueueSnackbar("Ha ocurrido un error", { variant: "error" });
        }
      } else {
        if (formData?.name?.value) {
          const response = await axiosPrivate.put(
            `${ApiPaths.expenseCategory}/${category.id}`,
            {
              name: formData.name.value,
            }
          );

          if (response.status === 204) {
            enqueueSnackbar("Registro actualizado", { variant: "success" });
            return;
          }
          enqueueSnackbar("Ha ocurrido un error", { variant: "error" });
        }
      }
    } catch (err: unknown) {
      const error = err as AxiosError<{ message?: string }>;

      if (error?.response?.data?.message) {
        enqueueSnackbar(error?.response?.data?.message, { variant: "error" });
      } else {
        enqueueSnackbar("Ha ocurrido un error", { variant: "error" });
      }
    }
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: { value } }));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Formulario de categorias</CardTitle>
        <CardDescription>
          {category
            ? "Modifica los datos de la categoria seleccionada"
            : "Crea tus categorias"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="space-y-2">
            <Label htmlFor="name">Nombre</Label>
            <Input
              id="name"
              name="name"
              value={formData?.name.value}
              onChange={handleOnChange}
              placeholder="Nombre de la categoría"
              // required
            />
          </div>

          <div className="flex justify-between pt-2">
            <Button type="submit" className="w-full">
              <Plus className="mr-2 h-4 w-4" />
              {category ? "Actualiza los datos" : "Crear Categoría"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
