import express from "express";
import { NextFunction, Request, Response } from "express-serve-static-core";
import { CreateExpenseCategoryDto } from "./expense-category-dto";
import prisma from "../../lib/prisma";
import { RoutesNames } from "../../lib/constants";

export const expenseCategoriesRouter = express.Router();

expenseCategoriesRouter.get(
  RoutesNames.expenseCategory.categories,
  getExpenseCategory
);
expenseCategoriesRouter.post(
  RoutesNames.expenseCategory.categories,
  createExpenseCategory
);

expenseCategoriesRouter.put(
  `${RoutesNames.expenseCategory.categories}/:categoryId`,
  updateCategoryExpense
);

expenseCategoriesRouter.delete(
  `${RoutesNames.expenseCategory.categories}/:categoryId`,
  deleteCategoryExpense
);

export async function deleteCategoryExpense(
  req: Request<{ categoryId: string }>,
  res: Response,
  next: NextFunction
): Promise<any> {
  try {
    const user = req.user;

    const { categoryId } = req.params;

    const findCategory = await prisma.expenseCategory.findUnique({
      where: { id: Number(categoryId), userId: user?.id },
    });

    if (!findCategory)
      return res.status(403).json({ message: "Categoria no disponible" });

    await prisma.expenseCategory.delete({
      where: { id: Number(categoryId) },
    });

    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
}
export async function getExpenseCategory(
  req: Request<{ categoryId: string }, {}, { name: string }>,
  res: Response,
  next: NextFunction
): Promise<any> {
  try {
    const categories = await prisma.expenseCategory.findMany({
      where: {
        userId: req.user?.id,
      },
    });

    return res.status(200).json({
      data: categories,
    });
  } catch (error) {
    next(error);
  }
}

export async function updateCategoryExpense(
  req: Request<{ categoryId: string }, {}, { name: string }>,
  res: Response,
  next: NextFunction
): Promise<any> {
  try {
    const user = req.user;

    const { categoryId } = req.params;

    const findCategory = await prisma.expenseCategory.findUnique({
      where: { id: Number(categoryId), userId: user?.id },
    });

    if (!findCategory)
      return res.status(403).json({ message: "Categoria no disponible" });

    if (!req.body.name)
      return res.status(400).json({ message: "Name es obligatorio" });

    const updateCategory = await prisma.expenseCategory.update({
      data: {
        name: req.body.name,
      },
      where: {
        id: Number(categoryId),
      },
    });

    res.status(204).json({
      message: "Success",
    });
  } catch (error) {
    next(error);
  }
}

export async function createExpenseCategory(
  req: Request<{}, {}, CreateExpenseCategoryDto>,
  res: Response,
  next: NextFunction
): Promise<any> {
  try {
    const user = req.user;

    if (!user) return res.send(403);

    const { name } = req.body;

    if (!name)
      return res.sendStatus(400).json({ message: "Name es obligatorio" });

    const findCategory = await prisma.expenseCategory.findFirst({
      where: { name: name, userId: user.id },
    });

    if (findCategory)
      return res.sendStatus(400).json({ message: "Categoria no disponible" });

    const newCategory = await prisma.expenseCategory.create({
      data: {
        name: name,
        userId: user.id,
      },
    });

    res.sendStatus(201).json({
      data: {
        category: newCategory,
      },
    });
  } catch (error) {
    next(error);
  }
}
