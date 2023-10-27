import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAirportDto } from './dto/create-airport.dto';
import { UpdateAirportDto } from './dto/update-airport.dto';
import { Airport } from './entities/airport.entity';

@Injectable()
export class AirportsService {
  constructor(
      @InjectRepository(Airport)
      private airportRepository: Repository<Airport>,
  ) {}

  async create(createAirportDto: CreateAirportDto): Promise<Airport> {
    const { name, cityId } = createAirportDto;

    const airport = this.airportRepository.create({
      name,
      cityId,
    });

    try {
      return await this.airportRepository.save(airport);
    } catch (error) {
      throw new InternalServerErrorException('Could not create airport');
    }
  }

  async findAll(): Promise<Airport[]> {
    return await this.airportRepository.find();
  }

  async findOne(id: number): Promise<Airport> {
    const airport = await this.airportRepository.findOne({ where: { id } });
    if (!airport) {
      throw new NotFoundException('Airport not found');
    }
    return airport;
  }

  async update(id: number, updateAirportDto: UpdateAirportDto): Promise<Airport> {
    const { name, cityId } = updateAirportDto;
    const airport = await this.findOne(id);

    if (name) airport.name = name;
    if (cityId) airport.cityId = cityId;

    try {
      await this.airportRepository.save(airport);
      return airport;
    } catch (error) {
      throw new InternalServerErrorException('Could not update airport');
    }
  }

  async remove(id: number): Promise<void> {
    const airport = await this.findOne(id);

    try {
      await this.airportRepository.remove(airport);
    } catch (error) {
      throw new InternalServerErrorException('Could not delete airport');
    }
  }
}
