import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import {Airport} from "../../airports/entities/airport.entity";

@Entity()
export class City {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToMany(() => Airport, airport => airport.city)
    airports: Airport[];

    @Column({ type: 'timestamp', nullable: true })
    deleted: Date;
}
