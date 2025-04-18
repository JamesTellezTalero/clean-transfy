import * as argon2 from "argon2";

export class ArrUtils {
    static hasUniqueNumbers(arr: number[]): boolean {
        return new Set(arr).size === arr.length;
    }

    static hasUniqueStrings(arr: string[]): boolean {
        return new Set(arr).size === arr.length;
    }
}
