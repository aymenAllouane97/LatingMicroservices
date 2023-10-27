import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CitiesService } from './cities.service';
import { CreateCityDto } from './dto/create-city.dto';
import { UpdateCityDto } from './dto/update-city.dto';

@Controller('cities')
export class CitiesController {
  constructor(private readonly citiesService: CitiesService) {}

  @MessagePattern({ cmd: 'createCity' })
  create(@Payload() createCityDto: CreateCityDto) {
    return this.citiesService.create(createCityDto);
  }

  @MessagePattern({ cmd: 'findAllCities' })
  findAll() {
    return this.citiesService.findAll();
  }

  @MessagePattern({ cmd: 'findOneCity' })
  findOne(@Payload() id: number) {
    return this.citiesService.findOne(id);
  }

  @MessagePattern({ cmd: 'updateCity' })
  update(@Payload() updateCityDto: UpdateCityDto) {
    return this.citiesService.update(updateCityDto.id, updateCityDto);
  }

  @MessagePattern({ cmd: 'removeCity' })
  remove(@Payload() id: number) {
    return this.citiesService.remove(id);
  }
}
