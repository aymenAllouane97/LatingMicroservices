import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ClientsService } from './clients.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';

@Controller()
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @MessagePattern({cmd:'createClient'})
  create(@Payload() createClientDto: CreateClientDto) {
    return this.clientsService.create(createClientDto);
  }

  @MessagePattern({cmd:'findAllClients'})
  findAll() {
    return this.clientsService.findAll();
  }

  @MessagePattern({cmd:'findOneClient'})
  findOne(@Payload() id: number) {
    return this.clientsService.findOne(id);
  }

  @MessagePattern({cmd:'updateClient'})
  update(@Payload() updateClientDto: UpdateClientDto) {
    return this.clientsService.update(updateClientDto.id, updateClientDto);
  }

  @MessagePattern({cmd:'removeClient'})
  remove(@Payload() id: number) {
    return this.clientsService.remove(id);
  }
}
