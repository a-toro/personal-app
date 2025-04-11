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
import { Pencil } from "lucide-react";
import { Category } from "./ExpenseCategoryForm";
import ExpenseCategoryDeleteButton from "./ExpenseCategoryDeleteButton";

interface ExpenseCategoryTableProps {
  categories?: Category[];
  setSelectedCategory: React.Dispatch<
    React.SetStateAction<Category | undefined>
  >;
  onReload?: () => void;
  inputCategoryRef: React.RefObject<HTMLInputElement | null>;
}

export function ExpenseCategoryTable({
  categories,
  setSelectedCategory,
  onReload,
  inputCategoryRef,
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
                  onClick={() => {
                    setSelectedCategory((prev) =>
                      prev ? { ...prev, ...category } : category
                    );
                    inputCategoryRef.current?.focus();
                  }}
                >
                  <Pencil className="h-4 w-4" />
                  <span className="sr-only">Editar</span>
                </Button>
                <ExpenseCategoryDeleteButton
                  category={category}
                  onReload={onReload}
                />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
