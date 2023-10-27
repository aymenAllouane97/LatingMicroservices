import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateFlightDto } from './dto/create-flight.dto';
import { UpdateFlightDto } from './dto/update-flight.dto';
import { Flight } from './entities/flight.entity';

@Injectable()
export class FlightsService {
  constructor(
      @InjectRepository(Flight)
      private flightRepository: Repository<Flight>,
  ) {}

  async create(createFlightDto: CreateFlightDto): Promise<Flight> {
    const {
      companyId,
      departureAirport,
      arrivalAirport,
      departureDate,
      arrivalDate,
      departureHour,
      arrivalHour,
    } = createFlightDto;

    const flight = this.flightRepository.create({
      companyId,
      departureAirport,
      arrivalAirport,
      departureDate,
      arrivalDate,
      departureHour,
      arrivalHour,
    });

    try {
      return await this.flightRepository.save(flight);
    } catch (error) {
      throw new InternalServerErrorException('Could not create flight');
    }
  }

  async findAll(): Promise<Flight[]> {
    return await this.flightRepository.find();
  }

  async findOne(id: number): Promise<Flight> {
    const flight = await this.flightRepository.findOne({ where: { id } });
    if (!flight) {
      throw new NotFoundException('Flight not found');
    }
    return flight;
  }

  async update(id: number, updateFlightDto: UpdateFlightDto): Promise<Flight> {
    const {
      companyId,
      departureAirport,
      arrivalAirport,
      departureDate,
      arrivalDate,
      departureHour,
      arrivalHour,
    } = updateFlightDto;

    const flight = await this.findOne(id);

    if (companyId) flight.companyId = companyId;
    if (departureAirport) flight.departureAirport = departureAirport;
    if (arrivalAirport) flight.arrivalAirport = arrivalAirport;
    if (departureDate) flight.departureDate = departureDate;
    if (arrivalDate) flight.arrivalDate = arrivalDate;
    if (departureHour) flight.departureHour = departureHour;
    if (arrivalHour) flight.arrivalHour = arrivalHour;

    try {
      await this.flightRepository.save(flight);
      return flight;
    } catch (error) {
      throw new InternalServerErrorException('Could not update flight');
    }
  }

  async remove(id: number): Promise<void> {
    const flight = await this.findOne(id);

    try {
      await this.flightRepository.remove(flight);
    } catch (error) {
      throw new InternalServerErrorException('Could not delete flight');
    }
  }
}
