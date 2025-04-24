import bcryptjs from "bcryptjs"
import { EnvConfig } from "./env";

export async function hassPassword(password: string): Promise<string> {
    return await bcryptjs.hash(password, EnvConfig.saltRounds);
}