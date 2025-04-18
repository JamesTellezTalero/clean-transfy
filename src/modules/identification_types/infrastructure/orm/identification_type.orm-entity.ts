import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    Index,
    OneToMany
} from "typeorm";

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
