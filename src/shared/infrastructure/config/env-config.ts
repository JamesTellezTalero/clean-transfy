import { Injectable } from "@nestjs/common";

@Injectable()
export class EnvConfig {
    port: number;

    currentProject: string;

    /// DATABASE SECTION
    databaseUrl: string;

    jwtSecret: string;

    constructor() {
        this.port = Number(process.env.PORT);

        this.currentProject = process.env.CURRENT_PROJECT_NAME;

        this.jwtSecret = process.env.JWT_SECRET;

        /// DATABASE SECTION
        this.databaseUrl = process.env.DATABASE_URL;
    }
}
