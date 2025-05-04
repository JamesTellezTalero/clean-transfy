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

/**
 * Entidad de dominio que representa un banco.
 * usa el ORM TypeORM
 */
@Entity("banks")
export class BankORMEntity {
    /**
     * Identificador único del banco.
     */
    @PrimaryGeneratedColumn()
    id: number;

    /**
     * nombre del banco.
     */
    @Column({
        type: "varchar",
        length: 65,
        nullable: false
    })
    @Index({ unique: true })
    name: string;

    /**
     * codigo único del banco.
     */
    @Column({
        type: "varchar",
        length: 6,
        nullable: false
    })
    code: string;

    /**
     * estado del banco.
     */
    @Column({
        type: "bool",
        nullable: true,
        default: true
    })
    status: boolean;

    /**
     * fecha de creacion del banco.
     */
    @CreateDateColumn({
        type: "timestamp",
        default: () => "CURRENT_TIMESTAMP",
        nullable: false
    })
    created_at: Date;

    /**
     * fecha de actualizacion del banco.
     */
    @UpdateDateColumn({
        type: "timestamp",
        default: () => "CURRENT_TIMESTAMP",
        nullable: false
    })
    updated_at: Date;
}
