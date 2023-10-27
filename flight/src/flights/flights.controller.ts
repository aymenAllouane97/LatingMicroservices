import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { FlightsService } from './flights.service'; // Assuming you have a FlightsService
import { CreateFlightDto } from './dto/create-flight.dto'; // Rename the DTO
import { UpdateFlightDto } from './dto/update-flight.dto'; // Rename the DTO

@Controller('flights')
export class FlightsController {
  constructor(private readonly flightsService: FlightsService) {}

  @MessagePattern({ cmd: 'createFlight' })
  create(@Payload() createFlightDto: CreateFlightDto) {
    return this.flightsService.create(createFlightDto);
  }

  @MessagePattern({ cmd: 'findAllFlights' })
  findAll() {
    return this.flightsService.findAll();
  }

  @MessagePattern({ cmd: 'findOneFlight' })
  findOne(@Payload() id: number) {
    return this.flightsService.findOne(id);
  }

  @MessagePattern({ cmd: 'updateFlight' })
  update(@Payload() updateFlightDto: UpdateFlightDto) {
    return this.flightsService.update(updateFlightDto.id, updateFlightDto);
  }

  @MessagePattern({ cmd: 'removeFlight' })
  remove(@Payload() id: number) {
    return this.flightsService.remove(id);
  }
}
