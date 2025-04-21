import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    Index,
    ManyToOne,
    JoinColumn,
    OneToMany,
    OneToOne
} from "typeorm";

@Entity("wallets")
export class WalletORMEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: "uuid",
        default: "uuid_generate_v4()",
        nullable: false
    })
    @Index({ unique: true })
    uuid: string;

    @Column({
        type: "int",
        nullable: false
    })
    user_id: number;

    @Column({
        type: "int",
        nullable: false
    })
    bank_id: number;

    @Column({
        type: "bigint",
        nullable: false
    })
    balance: number;

    @Column({
        type: "bool",
        nullable: true,
        default: true
    })
    status: boolean;

    @CreateDateColumn({
        type: "timestamp",
        default: () => "CURRENT_TIMESTAMP",
        nullable: false
    })
    created_at: Date;

    @UpdateDateColumn({
        type: "timestamp",
        default: () => "CURRENT_TIMESTAMP",
        nullable: false
    })
    updated_at: Date;
}
