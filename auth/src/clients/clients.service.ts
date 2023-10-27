import {Injectable, InternalServerErrorException, NotFoundException} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { Client } from './entities/client.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class ClientsService {
  constructor(
      @InjectRepository(Client)
      private clientsRepository: Repository<Client>,
  ) {}

  async create(createClientDto: CreateClientDto): Promise<Client> {
    const { name, password, email } = createClientDto;
    const hashedPassword = await bcrypt.hash(password, 10);

    const client = this.clientsRepository.create({
      name,
      password: hashedPassword,
      email,
    });

    try {
      return await this.clientsRepository.save(client);
    } catch (error) {
      throw new InternalServerErrorException('Could not create client');
    }
  }

  async findAll(): Promise<Client[]> {
    return await this.clientsRepository.find();
  }

  async findOne(id: number): Promise<Client> {
    const client = await this.clientsRepository.findOne({where:{id}});
    if (!client) {
      throw new NotFoundException('Client not found');
    }
    return client;
  }

  async update(id: number, updateClientDto: UpdateClientDto): Promise<Client> {
    const { name, password, email } = updateClientDto;
    const client = await this.findOne(id);

    if (name) client.name = name;
    if (password) client.password = await bcrypt.hash(password, 10);
    if (email) client.email = email;

    try {
      await this.clientsRepository.save(client);
      return client;
    } catch (error) {
      throw new InternalServerErrorException('Could not update client');
    }
  }

  async remove(id: number): Promise<void> {
    const client = await this.findOne(id);

    try {
      await this.clientsRepository.remove(client);
    } catch (error) {
      throw new InternalServerErrorException('Could not delete client');
    }
  }
}
