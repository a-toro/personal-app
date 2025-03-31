import { Expense } from "@prisma/client";

export interface CreateExpenseDto
  extends Omit<Expense, "id" | "updateAt" | "createAt" | "userId"> {}

export interface UpdateExpenseDto
  extends Omit<Expense, "id" | "updateAt" | "createAt" | "userId"> {}
