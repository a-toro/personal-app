import { PrismaClient } from "@prisma/client";
import { EnvConfig } from "./env";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma = globalForPrisma.prisma || new PrismaClient();

if (EnvConfig.enviroment !== "production") globalForPrisma.prisma = prisma;

export default prisma;
