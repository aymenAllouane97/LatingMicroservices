import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ClientProxy, ClientProxyFactory, Transport } from "@nestjs/microservices";
import { Observable } from "rxjs";

@Controller('flights')
export class FlightsController {
  private flights: ClientProxy;

  constructor() {
    this.flights = ClientProxyFactory.create({
      transport: Transport.TCP,
      options: {
        host: '127.0.0.1',
        port: 3002,
      },
    });
  }

  @Post('')
  create(@Body() createFlightDto): Observable<any> {
    const pattern = { cmd: 'createFlight' };
    return this.flights.send(pattern, createFlightDto);
  }

  @Get('')
  findAll(): Observable<any> {
    const pattern = { cmd: 'findAllFlights' };
    return this.flights.send(pattern, {});
  }

  @Get(':id')
  findOne(@Param('id') id: number): Observable<any> {
    const pattern = { cmd: 'findOneFlight' };
    return this.flights.send(pattern, id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() updateFlightDto): Observable<any> {
    const pattern = { cmd: 'updateFlight' };
    return this.flights.send(pattern, { id, ...updateFlightDto });
  }

  @Delete(':id')
  remove(@Param('id') id: number): Observable<any> {
    const pattern = { cmd: 'removeFlight' };
    return this.flights.send(pattern, id);
  }
}
