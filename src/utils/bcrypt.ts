import * as bcrypt from "bcrypt"

const salt = 10
export async function hashPass(password: string) {
    return await bcrypt.hash(password, salt)
}

export async function comparePass(password: string, hash: string) {
    return await bcrypt.compare(password, hash)
}