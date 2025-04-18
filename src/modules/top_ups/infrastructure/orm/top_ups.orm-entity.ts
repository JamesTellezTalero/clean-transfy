import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    Index,
    OneToMany
} from "typeorm";

@Entity("top_ups")
export class TopUpMigrationEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: "int",
        nullable: false
    })
    wallet_id: number;

    @Column({
        type: "bigint",
        nullable: false
    })
    @Index({ unique: true })
    amount: number;

    @CreateDateColumn({
        type: "timestamp",
        default: () => "CURRENT_TIMESTAMP"
    })
    created_at: Date;

    @UpdateDateColumn({
        type: "timestamp",
        default: () => "CURRENT_TIMESTAMP"
    })
    updated_at: Date;
}
