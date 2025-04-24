import { PrismaClient, Role } from "@prisma/client";
import * as dotenv from "dotenv";
import path from "path";

import { hassPassword } from "../src/lib/utils";

dotenv.config({ path: path.resolve(__dirname, "../.env") });


const prisma = new PrismaClient();
async function main() {
    await prisma.user.create({
        data: {
            name: "William Toro",
            email: process.env.FIRST_ADMIN_EMAIL as string,
            password: await hassPassword(process.env.FIRST_ADMIN_PASSWORD as string),
            role: Role.ADMIN
        }
    });

    await prisma.user.create({
        data: {
            name: "William Toro",
            email: "test@utp.edu.co",
            password: "123456",
            role: Role.USER
        }
    });

}

main()
    .then(() => {
        console.log("Seeding data succesfully")
    })
    .catch(err => {
        console.error(err);
        process.exit(1);
    })
    .finally(() => prisma.$disconnect());