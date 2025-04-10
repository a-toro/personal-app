import ExpenseCategoryForm, {
  Category,
} from "@/components/expenses/ExpenseCategoryForm";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useAxiosPrivate } from "@/hooks/useAxiosPrivate";
import { ApiPaths } from "@/lib/routerPaths";
import { Pencil, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";

export default function ExpenseCategoryPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<
    Category | undefined
  >(undefined);

  const axiosPrivate = useAxiosPrivate();

  const [reload, setReload] = useState(false);

  const onReload = () => setReload((prev) => !prev);

  useEffect(() => {
    (async () => {
      const response = await axiosPrivate.get(ApiPaths.expenseCategory);
      setCategories(response.data.data);
    })();
  }, [reload, axiosPrivate]);

  return (
    <div className="container">
      <h1 className="text-2xl font-bold mb-6">Gestionar categorias</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <section className="md:col-span-1">
          <ExpenseCategoryForm
            onReload={onReload}
            category={selectedCategory}
          />
        </section>
        <section className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Lista de Categorías</CardTitle>
              <CardDescription>
                Visualiza, edita o elimina las categorías existentes.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {categories.length === 0 ? (
                <div className="text-center py-10">
                  <p className="text-muted-foreground">
                    No hay categorías disponibles.
                  </p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Nombre</TableHead>
                        <TableHead className="text-right">Acciones</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {categories.map((category) => (
                        <TableRow key={category.id}>
                          <TableCell className="font-medium">
                            {category.name}
                          </TableCell>
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
                </div>
              )}
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}
