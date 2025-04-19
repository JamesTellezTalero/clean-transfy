/* eslint-disable @typescript-eslint/no-var-requires */
const { AppDataSource } = require("../../config/data-source");

const { seedBanks: SeedBanks } = require("../../typeorm/seeds/bank.seed");

async function mainSeed() {
    try {
        await AppDataSource.initialize();

        await SeedBanks(AppDataSource);

        console.log("Seeding process completed successfully.");
        await AppDataSource.destroy();
    } catch (error) {
        console.error("Error during the seeding process:", error);
    }
}

mainSeed();
