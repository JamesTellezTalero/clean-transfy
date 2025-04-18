/* eslint-disable @typescript-eslint/no-var-requires */
const { AppDataSource } = require("../../config/data-source");

async function mainSeed() {
    try {
        await AppDataSource.initialize();

        console.log("Seeding process completed successfully.");
        await AppDataSource.destroy();
    } catch (error) {
        console.error("Error during the seeding process:", error);
    }
}

mainSeed();
