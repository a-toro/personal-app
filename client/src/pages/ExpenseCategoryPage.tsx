import ExpenseCategoryForm, {
  Category,
} from "@/components/expenses/ExpenseCategoryForm";
import { ExpenseCategoryTable } from "@/components/expenses/ExpenseCategoryTable";
import Loader from "@/components/Loader";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { useAxiosPrivate } from "@/hooks/useAxiosPrivate";
import { ApiPaths } from "@/lib/routerPaths";
import { useEffect, useState } from "react";

export default function ExpenseCategoryPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<
    Category | undefined
  >(undefined);
  const [loading, setLoading] = useState(true);

  const axiosPrivate = useAxiosPrivate();

  const [reload, setReload] = useState(false);

  const onReload = () => setReload((prev) => !prev);

  useEffect(() => {
    (async () => {
      try {
        const response = await axiosPrivate.get(ApiPaths.expenseCategory);
        setCategories(response.data.data);
      } catch (error) {
        console.error({ error });
      } finally {
        setLoading(false);
      }
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
              {loading ? (
                <Loader />
              ) : categories.length === 0 ? (
                <div className="text-center py-10">
                  <p className="text-muted-foreground">
                    No hay categorías disponibles.
                  </p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <ExpenseCategoryTable
                    categories={categories}
                    setSelectedCategory={setSelectedCategory}
                    onReload={onReload}
                  />
                </div>
              )}
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}
