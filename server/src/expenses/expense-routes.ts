import express from "express";
import { NextFunction, Request, Response } from "express-serve-static-core";
import prisma from "../lib/prisma";
import { CreateExpenseDto, UpdateExpenseDto } from "./expense-dto";

export const expenseRouter = express.Router();

expenseRouter.get("/expenses", getExpenses);
expenseRouter.get("/expenses/:expenseId", getExpenseById);
expenseRouter.post("/expenses", createExpense);
expenseRouter.put("/expenses/:expenseId", updateExpense);
expenseRouter.delete("/expenses/:expenseId", deleteExpense);

export async function getExpenses(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> {
  try {
    const expenses = await prisma.expense.findMany({
      where: { userId: req.user?.id },
    });
    return res.status(200).json({
      data: expenses,
    });
  } catch (error) {
    next(error);
  }
}
export async function getExpenseById(
  req: Request<{ expenseId: string }>,
  res: Response,
  next: NextFunction
): Promise<any> {
  try {
    const expense = await prisma.expense.findUnique({
      where: {
        id: Number(req.params.expenseId),
        userId: req.user?.id,
      },
    });

    if (!expense) return res.sendStatus(400);

    return res.status(200).json({
      data: expense,
    });
  } catch (error) {
    next(error);
  }
}
export async function createExpense(
  req: Request<{}, {}, CreateExpenseDto>,
  res: Response,
  next: NextFunction
): Promise<any> {
  try {
    if (!req.user) return res.sendStatus(403);

    const { amount, date, description, expenseCategoryId } = req.body;

    console.log(new Date(date));

    // console.log({ amount, date, description, expenseCategoryId });

    if (!amount || !date || !expenseCategoryId)
      return res.status(400).json({ message: "Completa todos los campos" });

    // Validar si la categoria existe.
    const findCategory = await prisma.expenseCategory.findUnique({
      where: { id: Number(expenseCategoryId), userId: req.user.id },
    });

    if (!findCategory)
      return res.status(400).json({ message: "Categoria no encontrada" });

    // Crear el gasto
    const newExpense = await prisma.expense.create({
      data: {
        amount,
        date: new Date(date),
        userId: req.user?.id,
        expenseCategoryId,
        description,
      },
    });

    return res.status(201).json({
      data: {
        newExpense,
      },
    });
  } catch (error) {
    next(error);
  }
}
export async function updateExpense(
  req: Request<{ expenseId: string }, {}, UpdateExpenseDto>,
  res: Response,
  next: NextFunction
): Promise<any> {
  try {
    if (!req.user) return res.sendStatus(403);

    const { expenseId } = req.params;
    let { amount, date, description, expenseCategoryId } = req.body;
    const { id: userId } = req.user;

    const findExpense = await prisma.expense.findUnique({
      where: { id: Number(expenseId), userId },
    });

    if (!findExpense)
      return res.status(400).json({ message: "Gastos no encontrado" });

    if (expenseCategoryId) {
      const findCategory = await prisma.expenseCategory.findUnique({
        where: { id: Number(expenseCategoryId), userId },
      });

      if (!findCategory)
        return res.status(400).json({ message: "Categoria no encontrada" });
    }

    await prisma.expense.update({
      data: {
        date: date ? new Date(date) : findExpense.date,
        amount: amount ? amount : findExpense.amount,
        description: description ? description : findExpense.description,
        expenseCategoryId: expenseCategoryId
          ? Number(expenseCategoryId)
          : findExpense.expenseCategoryId,
      },
      where: {
        id: Number(expenseId),
      },
    });

    return res.sendStatus(204);

    // Validar la categoria
  } catch (error) {
    next(error);
  }
}
export async function deleteExpense(
  req: Request<{ expenseId: string }>,
  res: Response,
  next: NextFunction
): Promise<any> {
  try {
    const user = req.user;
    if (!user) return res.sendStatus(403);

    const findExpense = await prisma.expense.findUnique({
      where: {
        id: Number(req.params.expenseId),
        userId: req.user?.id,
      },
    });

    if (!findExpense)
      return res.status(400).json({ messgae: "Registro no encontrado" });

    await prisma.expense.delete({
      where: {
        id: findExpense.id,
      },
    });

    return res.status(204).json({ message: "Registo eliminado" });
  } catch (error) {
    next(error);
  }
}
