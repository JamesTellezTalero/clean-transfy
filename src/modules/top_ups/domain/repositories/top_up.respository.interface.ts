import { TopUpCreateDatabaseDto } from "../../application/dtos/top_up.create-database.dto";
import { TopUp } from "../entities/top_up.entity";

export interface ITopUpRepository {
    findById(id: number): Promise<TopUp>;
    findByWalletId(id: number): Promise<TopUp[]>;
    findAll(): Promise<TopUp[]>;
    create(data: TopUpCreateDatabaseDto): Promise<TopUp>;
}
