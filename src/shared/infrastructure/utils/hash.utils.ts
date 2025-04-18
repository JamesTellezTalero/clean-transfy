import * as argon2 from "argon2";

export class HashUtils {
    static async hashPassword(password: string): Promise<string> {
        return await argon2.hash(password);
    }

    static async comparePasswords(
        plainPassword: string,
        hashedPassword: string
    ): Promise<boolean> {
        return await argon2.verify(hashedPassword, plainPassword);
    }
}
