import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import {Airport} from "../../airports/entities/airport.entity";

@Entity()
export class Flight {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    companyId: number;

    @Column()
    departureAirport: number;

    @Column()
    arrivalAirport: number;

    @Column('timestamp')
    departureDate: Date;

    @Column('timestamp')
    arrivalDate: Date;

    @Column('timestamp')
    departureHour: Date;

    @Column('timestamp')
    arrivalHour: Date;



    @ManyToOne(() => Airport, airport => airport.arrivalFlights, { onDelete: 'CASCADE' })
    ArrivalAirport: Airport;

    @ManyToOne(() => Airport, airport => airport.departureFlights, { onDelete: 'CASCADE' })
    DepartureAirport: Airport;


    @Column({ type: 'timestamp', nullable: true })
    deleted: Date;
}
