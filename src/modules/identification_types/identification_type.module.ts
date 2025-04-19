import { Module } from "@nestjs/common";
import { IdentificationTypeController } from "./presentation/controllers/identification_type.controller";
import { IdentificationTypeRepositoryService } from "./infrastructure/repositories/identification_type.repository.service";
import { createIdentificationTypeUseCase } from "./application/use-cases/create-identification_types.use-case";
import { deleteIdentificationTypeUseCase } from "./application/use-cases/delete-identification_types.use-case";
import { updateIdentificationTypeUseCase } from "./application/use-cases/update-identification_types.use-case";
import { findByAllIdentificationTypeUseCase } from "./application/use-cases/find-by-all-identification_types.use-case";
import { findByIdIdentificationTypeUseCase } from "./application/use-cases/find-by-id-identification_types.use-case";
import { findByNameIdentificationTypeUseCase } from "./application/use-cases/find-by-name-identification_types.use-case";
import { TypeOrmModule } from "@nestjs/typeorm";
import { IdentificationTypeORMEntity } from "./infrastructure/orm/identification_type.orm-entity";

@Module({
    imports: [TypeOrmModule.forFeature([IdentificationTypeORMEntity])],
    controllers: [IdentificationTypeController],
    providers: [
        {
            provide: "IIdentificationTypeRepository",
            useClass: IdentificationTypeRepositoryService
        },
        createIdentificationTypeUseCase,
        deleteIdentificationTypeUseCase,
        updateIdentificationTypeUseCase,
        findByAllIdentificationTypeUseCase,
        findByIdIdentificationTypeUseCase,
        findByNameIdentificationTypeUseCase
    ]
})
export class IdentificationTypeModule {}
