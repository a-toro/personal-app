import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { useState } from "react";

export default function ExpenseCategoryPage() {
  const [categories, setCategories] = useState([
    {
      id: "1",
      name: "ElectrÃ³nica",
      description: "Productos electrÃ³nicos y gadgets",
    },
    { id: "2", name: "Ropa", description: "Todo tipo de prendas de vestir" },
    {
      id: "3",
      name: "Hogar",
      description: "ArtÃ­culos para el hogar y decoraciÃ³n",
    },
  ]);
  return (
    <div className="container">
      <h1 className="text-2xl font-bold mb-6">Gestionar categorias</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <section className="md:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Formulario de categorias</CardTitle>
              <CardDescription>Crea o modifica tus categorias</CardDescription>
            </CardHeader>
            <CardContent>
              <form>
                <div className="space-y-2">
                  <Label htmlFor="name">Nombre</Label>
                  <Input
                    id="name"
                    name="name"
                    //   value={formValues.name}
                    //   onChange={handleInputChange}
                    placeholder="Nombre de la categoría"
                    required
                  />
                </div>

                <div className="flex justify-between pt-2">
                  {/* {editingCategory ? ( */}
                  {/* <>
                    <Button type="button" variant="outline" onClick={resetForm}>
                      Cancelar
                    </Button>
                    <Button type="submit">
                      <Save className="mr-2 h-4 w-4" />
                      Guardar Cambios
                    </Button>
                  </>
                ) : ( */}
                  <Button type="submit" className="w-full">
                    <Plus className="mr-2 h-4 w-4" />
                    Crear Categoría
                  </Button>
                  {/* )} */}
                </div>
              </form>
            </CardContent>
          </Card>
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
                        <TableHead>Descripción</TableHead>
                        <TableHead className="text-right">Acciones</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {categories.map((category) => (
                        <TableRow key={category.id}>
                          <TableCell className="font-medium">
                            {category.name}
                          </TableCell>
                          <TableCell>{category.description}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end space-x-2">
                              <Button
                                variant="outline"
                                size="icon"
                                // onClick={() => selectCategoryToEdit(category)}
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
