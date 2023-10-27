import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import {City} from "../../cities/entities/city.entity";
import {Flight} from "../../flights/entities/flight.entity";

@Entity()
export class Airport {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    cityId: number;

    @OneToMany(() => Flight, flight => flight.departureAirport)
    departureFlights: Flight[];

    @OneToMany(() => Flight, flight => flight.arrivalAirport)
    arrivalFlights: Flight[];

    @ManyToOne(() => City, city => city.airports, { onDelete: 'CASCADE' })
    city: City;



    @Column({ type: 'timestamp', nullable: true })
    deleted: Date;
}
