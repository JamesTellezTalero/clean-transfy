export class StringUtils {
    static generateRandomString(
        length: number,
        options: {
            letters?: boolean;
            numbers?: boolean;
            specialChars?: boolean;
        } = {}
    ): string {
        const letterChars =
            "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
        const numberChars = "0123456789";
        const specialChars = "!@#$%^&*()_+[]{}|;:,.<>?";

        let possibleChars = "";

        if (options.letters) possibleChars += letterChars;
        if (options.numbers) possibleChars += numberChars;
        if (options.specialChars) possibleChars += specialChars;

        if (!possibleChars)
            throw new Error("Debe seleccionar al menos un tipo de carácter.");

        let randomString = "";
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(
                Math.random() * possibleChars.length
            );
            randomString += possibleChars[randomIndex];
        }
        console.log("PASSWORD RESET: ", randomString);
        return randomString;
    }
}
