/* eslint-disable @typescript-eslint/no-var-requires */
const {
    BankORMEntity
} = require("../../../../modules/banks/infrastructure/orm/bank.orm-entity");

const BanksData = [
    { name: "banco amarillo", code: "BNK001" },
    { name: "banco rojo", code: "BNK002" },
    { name: "banco azul", code: "BNK003" },
    { name: "banco verde", code: "BNK004" }
];

async function seedBanks(AppDataSource) {
    try {
        const BankORMEntityRepository =
            await AppDataSource.getRepository(BankORMEntity);

        const tableName = BankORMEntityRepository.metadata.tableName;

        for (const typeData of BanksData) {
            // Check if the record already exists by ID
            const existingName = await BankORMEntityRepository.findOne({
                where: { name: typeData.name }
            });
            const existingCode = await BankORMEntityRepository.findOne({
                where: { code: typeData.code }
            });

            // If no record exists, insert it

            if (!existingName && !existingCode)
                await BankORMEntityRepository.query(
                    `INSERT INTO ${tableName} (code, name)
                     VALUES ($1, $2 ) ;`,
                    [typeData.code, typeData.name]
                );
            console.log(
                `Bank ${typeData.name} with code ${typeData.code} seeded successfully.`
            );
        }
        console.log("Banks seeded successfully.");
    } catch (error) {
        console.error("Error during Banks seeding:", error);
    }
}
module.exports = { seedBanks };
