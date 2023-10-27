import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCityDto } from './dto/create-city.dto';
import { UpdateCityDto } from './dto/update-city.dto';
import { City } from './entities/city.entity';

@Injectable()
export class CitiesService {
  constructor(
      @InjectRepository(City)
      private cityRepository: Repository<City>,
  ) {}

  async create(createCityDto: CreateCityDto): Promise<City> {
    const { name } = createCityDto;

    const city = this.cityRepository.create({
      name,
    });

    try {
      return await this.cityRepository.save(city);
    } catch (error) {
      throw new InternalServerErrorException('Could not create city');
    }
  }

  async findAll(): Promise<City[]> {
    return await this.cityRepository.find();
  }

  async findOne(id: number): Promise<City> {
    const city = await this.cityRepository.findOne({ where: { id } });
    if (!city) {
      throw new NotFoundException('City not found');
    }
    return city;
  }

  async update(id: number, updateCityDto: UpdateCityDto): Promise<City> {
    const { name } = updateCityDto;
    const city = await this.findOne(id);

    if (name) city.name = name;

    try {
      await this.cityRepository.save(city);
      return city;
    } catch (error) {
      throw new InternalServerErrorException('Could not update city');
    }
  }

  async remove(id: number): Promise<void> {
    const city = await this.findOne(id);

    try {
      await this.cityRepository.remove(city);
    } catch (error) {
      throw new InternalServerErrorException('Could not delete city');
    }
  }
}
