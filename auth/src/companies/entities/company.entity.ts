import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";
@Entity()
export class Company {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true, length: 255 })
    name: string;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn({ nullable: true })
    updatedAt: Date | null;

    @Column({ nullable: true })
    deleted: Date | null;

}
