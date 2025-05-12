import { Module } from "@nestjs/common";
import { IdentificationTypeController } from "./presentation/controllers/identification_type.controller";
import { IdentificationTypeRepositoryService } from "./infrastructure/repositories/identification_type.repository.service";
import { deleteIdentificationTypeUseCase } from "./application/use-cases/delete-identification_types.use-case";
import { updateIdentificationTypeUseCase } from "./application/use-cases/update-identification_types.use-case";
import { findAllIdentificationTypeUseCase } from "./application/use-cases/find-all-identification_types.use-case";
import { findByIdIdentificationTypeUseCase } from "./application/use-cases/find-by-id-identification_types.use-case";
import { findByNameIdentificationTypeUseCase } from "./application/use-cases/find-by-name-identification_types.use-case";
import { TypeOrmModule } from "@nestjs/typeorm";
import { IdentificationTypeORMEntity } from "./infrastructure/orm/identification_type.orm-entity";
import { CreateIdentificationTypeUseCase } from "./application/use-cases/create-identification_types.use-case";

@Module({
    imports: [TypeOrmModule.forFeature([IdentificationTypeORMEntity])],
    controllers: [IdentificationTypeController],
    providers: [
        {
            provide: "IIdentificationTypeRepository",
            useClass: IdentificationTypeRepositoryService
        },
        CreateIdentificationTypeUseCase,
        deleteIdentificationTypeUseCase,
        updateIdentificationTypeUseCase,
        findAllIdentificationTypeUseCase,
        findByIdIdentificationTypeUseCase,
        findByNameIdentificationTypeUseCase
    ]
})
export class IdentificationTypeModule {}
