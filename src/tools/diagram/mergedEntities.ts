import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    Index,
    CreateDateColumn,
    UpdateDateColumn
} from "typeorm";

// From bank.orm-entity.ts
@Entity("banks")
export class BankORMEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: "varchar",
        length: 65,
        nullable: false
    })
    @Index({ unique: true })
    name: string;

    @Column({
        type: "varchar",
        length: 6,
        nullable: false
    })
    code: string;

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

// From identification_type.orm-entity.ts
@Entity("identification_types")
export class IdentificationTypeMigrationEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: "varchar",
        length: 15,
        nullable: false
    })
    @Index({ unique: true })
    name: string;

    @Column({
        type: "varchar",
        length: 10,
        nullable: false
    })
    @Index({ unique: true })
    code: string;

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

// From top_ups.orm-entity.ts
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

// From transfer.orm-entity.ts
@Entity("transfers")
export class TransferMigrationEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: "int",
        nullable: false
    })
    source_wallet_id: number;

    @Column({
        type: "int",
        nullable: false
    })
    target_wallet_id: number;

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

// From user.orm-entity.ts
@Entity("users")
@Index("IDX_users_email", ["email"])
@Index("IDX_users_username", ["username"])
@Index("IDX_users_identification", ["identification_number"])
@Index("IDX_users_identification_type", ["identification_type_id"])
@Index("IDX_users_username_and_email_and_identification", [
    "username",
    "email",
    "identification_number"
])
@Index("IDX_users_identification_and_identification_type", [
    "identification_number",
    "identification_type_id"
])
export class UserMigrationEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: "varchar",
        length: 100,
        nullable: false
    })
    @Index({ unique: true })
    username: string;

    @Column({
        type: "varchar",
        length: 100,
        nullable: false
    })
    password: string;

    @Column({
        type: "uuid",
        default: "uuid_generate_v4()",
        nullable: false
    })
    @Index({ unique: true })
    uuid: string;

    @Column({
        type: "bool",
        nullable: true,
        default: true
    })
    status: boolean;

    @Column({
        type: "varchar",
        length: 100,
        nullable: false
    })
    first_name: string;

    @Column({
        type: "varchar",
        length: 100,
        nullable: true
    })
    middle_name: string;

    @Column({
        type: "varchar",
        length: 100,
        nullable: false
    })
    last_name: string;

    @Column({
        type: "varchar",
        length: 100,
        nullable: true
    })
    second_last_name: string;

    @Column({
        type: "varchar",
        length: 50,
        nullable: false
    })
    @Index({ unique: true })
    identification_number: string;

    @Column({
        type: "int",
        nullable: false
    })
    identification_type_id: number;

    @Column({
        type: "int",
        nullable: false
    })
    reg_status_id: number;

    @Column({
        type: "int",
        nullable: false
    })
    role_id: number;

    @Column({
        type: "varchar",
        length: 255,
        nullable: false
    })
    @Index({ unique: true })
    email: string;

    @Column({
        type: "varchar",
        length: 20,
        nullable: true
    })
    phone: string;

    @Column({
        type: "text",
        nullable: true
    })
    address: string;

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

// From wallet.orm-entity.ts
@Entity("wallets")
export class WalletMigrationEntity {
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
