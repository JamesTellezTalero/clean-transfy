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

@Entity("banks")
export class BankMigrationEntity {
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
