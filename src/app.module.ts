import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule } from "@nestjs/config";
import Joi from "joi";
import { EnviromentConfigModule } from "./shared/infrastructure/config/enviroment-config.module";
import { BankModule } from "./modules/banks/bank.module";
import { APP_FILTER } from "@nestjs/core";
import { AllExceptionsFilter } from "./shared/infrastructure/filters/http-exception.filter";
import { IdentificationTypeModule } from "./modules/identification_types/identification_type.module";
import { UserModule } from "./modules/users/user.module";
import { AuthModule } from "./modules/auth/auth.module";
import { WalletModule } from "./modules/wallets/wallet.module";
import { TopUpModule } from "./modules/top_ups/top_up.module";
import { TransferModule } from "./modules/transfers/transfer.module";

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: ".env",
            isGlobal: true,
            validationSchema: Joi.object({
                PORT: Joi.number().required(),

                CURRENT_PROJECT_NAME: Joi.string().required(),

                /// DATABASE SECTION
                DATABASE_URL: Joi.string().required()
            })
        }),
        TypeOrmModule.forRoot({
            type: "postgres",
            url: process.env.DATABASE_URL,
            entities: [__dirname + "/**/*.orm-entity{.ts,.js}"],
            synchronize: false,
            migrationsRun: false,
            logging: false,
            useUTC: true,
            extra: {
                timezone: "UTC"
            }
        }),
        EnviromentConfigModule,
        BankModule,
        IdentificationTypeModule,
        UserModule,
        AuthModule,
        WalletModule,
        TopUpModule,
        TransferModule
    ],
    controllers: [AppController],
    providers: [
        AppService,
        {
            provide: APP_FILTER,
            useClass: AllExceptionsFilter
        }
    ]
})
export class AppModule {}
