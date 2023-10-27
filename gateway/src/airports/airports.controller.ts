import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ClientProxy, ClientProxyFactory, Transport } from "@nestjs/microservices";
import { Observable } from "rxjs";

@Controller('airports')
export class AirportsController {
  private airports: ClientProxy;

  constructor() {
    this.airports = ClientProxyFactory.create({
      transport: Transport.TCP,
      options: {
        host: '127.0.0.1',
        port: 3002,
      },
    });
  }

  @Post()
  create(@Body() createAirportDto): Observable<any> {
    const pattern = { cmd: 'createAirport' };
    return this.airports.send(pattern, createAirportDto);
  }

  @Get()
  findAll(): Observable<any> {
    const pattern = { cmd: 'findAllAirports' };
    return this.airports.send(pattern, {});
  }

  @Get(':id')
  findOne(@Param('id') id: number): Observable<any> {
    const pattern = { cmd: 'findOneAirport' };
    return this.airports.send(pattern, id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() updateAirportDto): Observable<any> {
    const pattern = { cmd: 'updateAirport' };
    return this.airports.send(pattern, { id, ...updateAirportDto });
  }

  @Delete(':id')
  remove(@Param('id') id: number): Observable<any> {
    const pattern = { cmd: 'removeAirport' };
    return this.airports.send(pattern, id);
  }
}
