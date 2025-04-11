import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Button } from "../ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { Category } from "./ExpenseCategoryForm";

interface ExpenseCategoryTableProps {
  categories?: Category[];
  setSelectedCategory: React.Dispatch<
    React.SetStateAction<Category | undefined>
  >;
}

export function ExpenseCategoryTable({
  categories,
  setSelectedCategory,
}: ExpenseCategoryTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Nombre</TableHead>
          <TableHead className="text-right">Acciones</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {categories?.map((category) => (
          <TableRow key={category.id}>
            <TableCell className="font-medium">{category.name}</TableCell>
            <TableCell className="text-right">
              <div className="flex justify-end space-x-2">
                <Button
                  variant="outline"
                  size="icon"
                  // onClick={() => selectCategoryToEdit(category)}
                  onClick={() =>
                    setSelectedCategory((prev) =>
                      prev ? { ...prev, ...category } : category
                    )
                  }
                >
                  <Pencil className="h-4 w-4" />
                  <span className="sr-only">Editar</span>
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="text-destructive"
                  //   onClick={() => handleDeleteCategory(category.id)}
                >
                  <Trash2 className="h-4 w-4" />
                  <span className="sr-only">Eliminar</span>
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
