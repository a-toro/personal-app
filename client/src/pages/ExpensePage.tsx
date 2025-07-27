import { ExpenseForm } from "@/components/expenses/ExpenseForm";
import NewExpenseButton from "@/components/expenses/NewExpenseButton";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useFetch } from "@/hooks/useFetch";
import { currencyFormat } from "@/lib/currencyFormat";
// import {
//   DropdownMenu,
//   DropdownMenuCheckboxItem,
//   DropdownMenuContent,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
import { Plus, SearchIcon } from "lucide-react";
import { useState } from "react";

// const transactions = [
//   {
//     id: "1",
//     date: "2023-04-23",
//     name: "Grocery Store",
//     amount: -120.5,
//     category: "Food",
//     status: "completed",
//   },
//   {
//     id: "2",
//     date: "2023-04-22",
//     name: "Monthly Salary",
//     amount: 3500.0,
//     category: "Income",
//     status: "completed",
//   },
//   {
//     id: "3",
//     date: "2023-04-21",
//     name: "Electric Bill",
//     amount: -85.2,
//     category: "Utilities",
//     status: "completed",
//   },
//   {
//     id: "4",
//     date: "2023-04-20",
//     name: "Restaurant Dinner",
//     amount: -65.8,
//     category: "Food",
//     status: "completed",
//   },
//   {
//     id: "5",
//     date: "2023-04-19",
//     name: "Gas Station",
//     amount: -45.0,
//     category: "Transportation",
//     status: "completed",
//   },
//   {
//     id: "6",
//     date: "2023-04-18",
//     name: "Online Shopping",
//     amount: -129.99,
//     category: "Shopping",
//     status: "pending",
//   },
//   {
//     id: "7",
//     date: "2023-04-17",
//     name: "Freelance Payment",
//     amount: 850.0,
//     category: "Income",
//     status: "completed",
//   },
//   {
//     id: "8",
//     date: "2023-04-16",
//     name: "Internet Bill",
//     amount: -75.0,
//     category: "Utilities",
//     status: "completed",
//   },
// ];

export default function ExpensePage() {
  const [open, setOpen] = useState(false);

  const {
    isError,
    isLoading,
    data: transactions,
  } = useFetch<{
    id: string;
    amount: number;
    date: string;
    description: string;
    categoryName: string;
  }>("/expenses");

  console.log({ isError, isLoading, transactions });

  if (isLoading) return <div>Cargando...</div>;

  if (isError) return <div>Error al consultar la informaci�n... :(</div>;

  return (
    <>
      <div className="container mx-auto py-6">
        <h1 className="text-3xl font-bold mb-6">Registro de gastos</h1>
        {/* <div>Cards</div> */}
        <div className="justify-end flex sm:justify-end flex-wrap flex-col gap-2 sm:flex-row">
          <div className="flex gap-2 flex-col sm:flex-row">
            <Button
              variant={"outline"}
              className="w-full sm:w-auto"
              onClick={() => setOpen(true)}
            >
              <Plus className="mr-2 size-4" />
              Nuevo registro
            </Button>
            {/* <Button variant={"outline"} size={"sm"} className="w-full sm:w-auto">
            <Download className="mr-2 size-4" />
            Descargar
          </Button> */}
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
        <div className="mt-6">
          <Card>
            <CardContent>
              <div className="space-y-4">
                <div className=" overflow-hidden">
                  <Table>
                    <TableHeader
                      // className="bg-muted/50"
                      className="border-b"
                    >
                      <TableHead className="text-slate-500 uppercase">
                        Fecha
                      </TableHead>
                      <TableHead className="text-slate-500 uppercase">
                        Categoria
                      </TableHead>
                      <TableHead className="text-slate-500 uppercase">
                        Descripción
                      </TableHead>
                      <TableHead className="text-slate-500 text-end uppercase">
                        Valor
                      </TableHead>
                      <TableHead className="text-slate-500 text-end uppercase"></TableHead>
                    </TableHeader>
                    <TableBody>
                      {transactions.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={5} className="text-center py-8">
                            <div className="flex flex-col items-center justify-center text-muted-foreground">
                              <SearchIcon className="h-10 w-10 mb-2 opacity-20" />
                              <p>No transactions found</p>
                            </div>
                          </TableCell>
                        </TableRow>
                      ) : (
                        transactions.map((transaction) => (
                          <TableRow
                            key={transaction.id}
                            className="hover:bg-gray-300/20 transition-colors"
                          >
                            <TableCell className="font-medium py-4">
                              {transaction.date}
                            </TableCell>
                            <TableCell>
                              <span>{transaction?.categoryName}</span>
                            </TableCell>
                            <TableCell>
                              <span className="bg-muted/30">
                                {transaction?.description}
                              </span>
                            </TableCell>
                            <TableCell
                              className={`text-right font-medium ${
                                transaction.amount > 0
                                  ? "text-emerald-600"
                                  : "text-red-600"
                              }`}
                            >
                              {/* {transaction.amount > 0 ? "+" : ""} */}
                              {transaction.amount < 0 ? (
                                `- ${currencyFormat(
                                  Number(
                                    transaction.amount
                                      .toString()
                                      .replace("-", "")
                                  )
                                )}`
                              ) : (
                                <span className="bg-green-200 border-green-300 border-2 px-3 py-1 rounded-sm font-semibold text-green-900 hover:opacity-60">
                                  {`+ ${currencyFormat(transaction.amount)}`}
                                </span>
                              )}
                            </TableCell>
                            <TableCell className="text-end w-10">
                              <div className="flex flex-row justify-stretch items-center">
                                <Button
                                  variant={"link"}
                                  className="text-blue-600"
                                >
                                  Editar
                                </Button>
                                <Button
                                  variant={"link"}
                                  className="text-red-600"
                                >
                                  Eliminar
                                </Button>
                                <Button
                                  variant={"link"}
                                  className="text-green-600"
                                >
                                  Ver
                                </Button>
                                {/* <EllipsisVertical className="size-4" /> */}
                              </div>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </CardContent>
            <CardFooter className="w-full pt-2">
              <div className="w-full flex justify-between  items-center">
                <div>
                  <span className="font-semibold">10</span> -{" "}
                  <span className="font-semibold">100</span> registros
                </div>
                <div className="flex gap-1.5 items-center">
                  <span className="">Número de registros</span>
                  <select
                    className="border px-3 py-1 font-semibold rounded-sm border-gray-400"
                    name="pagination"
                    id="pagination"
                  >
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="30">30</option>
                  </select>
                </div>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <div className="grid gap-4">
            <ExpenseForm />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
