/* eslint-disable @typescript-eslint/no-var-requires */
const {
    IdentificationTypeORMEntity
} = require("../../../../modules/identification_types/infrastructure/orm/identification_type.orm-entity");

const IdentificationTypesData = [
    { name: "Cédula de ciudadanía", code: "CC" },
    { name: "Tarjeta de extranjería", code: "TE" },
    { name: "NIT", code: "NIT" }
];

async function seedIdentificationTypes(AppDataSource) {
    try {
        const IdentificationTypeORMEntityRepository =
            await AppDataSource.getRepository(IdentificationTypeORMEntity);

        const tableName =
            IdentificationTypeORMEntityRepository.metadata.tableName;

        for (const typeData of IdentificationTypesData) {
            // Check if the record already exists by ID
            const existingName =
                await IdentificationTypeORMEntityRepository.findOne({
                    where: { name: typeData.name }
                });
            const existingCode =
                await IdentificationTypeORMEntityRepository.findOne({
                    where: { code: typeData.code }
                });

            // If no record exists, insert it

            if (!existingName && !existingCode)
                await IdentificationTypeORMEntityRepository.query(
                    `INSERT INTO ${tableName} (code, name)
                     VALUES ($1, $2 ) ;`,
                    [typeData.code, typeData.name]
                );
            console.log(
                `Identification Type ${typeData.name} with code ${typeData.code} seeded successfully.`
            );
        }
        console.log("Identification Types seeded successfully.");
    } catch (error) {
        console.error("Error during Identification Types seeding:", error);
    }
}
module.exports = { seedIdentificationTypes };
