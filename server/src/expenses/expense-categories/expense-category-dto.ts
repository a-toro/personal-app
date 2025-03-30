import { ExpenseCategory } from "@prisma/client";

export interface CreateExpenseCategoryDto
  extends Omit<ExpenseCategory, "id" | "createAt" | "updateAt" | "userId"> {}
export interface ExpenseCategoryDto extends Omit<ExpenseCategory, "userId"> {}
