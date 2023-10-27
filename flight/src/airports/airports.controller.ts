import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AirportsService } from './airports.service';
import { CreateAirportDto } from './dto/create-airport.dto';
import { UpdateAirportDto } from './dto/update-airport.dto';

@Controller('airports')
export class AirportsController {
  constructor(private readonly airportsService: AirportsService) {}

  @MessagePattern({ cmd: 'createAirport' })
  create(@Payload() createAirportDto: CreateAirportDto) {
    return this.airportsService.create(createAirportDto);
  }

  @MessagePattern({ cmd: 'findAllAirports' })
  findAll() {
    return this.airportsService.findAll();
  }

  @MessagePattern({ cmd: 'findOneAirport' })
  findOne(@Payload() id: number) {
    return this.airportsService.findOne(id);
  }

  @MessagePattern({ cmd: 'updateAirport' })
  update(@Payload() updateAirportDto: UpdateAirportDto) {
    return this.airportsService.update(updateAirportDto.id, updateAirportDto);
  }

  @MessagePattern({ cmd: 'removeAirport' })
  remove(@Payload() id: number) {
    return this.airportsService.remove(id);
  }
}
