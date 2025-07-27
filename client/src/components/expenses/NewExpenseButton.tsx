import React from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { ExpenseForm } from "./ExpenseForm";
import { Plus } from "lucide-react";

export default function NewExpenseButton() {
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button variant={"outline"} className="w-full sm:w-auto">
            <Plus className="mr-2 size-4" />
            Nuevo registro
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Registrar nuevo gasto</DialogTitle>
            <DialogDescription>Registra tus gastos.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <ExpenseForm />
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
