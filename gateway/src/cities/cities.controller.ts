import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ClientProxy, ClientProxyFactory, Transport } from "@nestjs/microservices";
import { Observable } from "rxjs";

@Controller('cities')
export class CitiesController {
  private cities: ClientProxy;

  constructor() {
    this.cities = ClientProxyFactory.create({
      transport: Transport.TCP,
      options: {
        host: '127.0.0.1',
        port: 3002,
      },
    });
  }

  @Post('')
  create(@Body() createCityDto): Observable<any> {
    const pattern = { cmd: 'createCity' };
    return this.cities.send(pattern, createCityDto);
  }

  @Get('')
  findAll(): Observable<any> {
    const pattern = { cmd: 'findAllCities' };
    return this.cities.send(pattern, {});
  }

  @Get(':id')
  findOne(@Param('id') id: number): Observable<any> {
    const pattern = { cmd: 'findOneCity' };
    return this.cities.send(pattern, id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() updateCityDto): Observable<any> {
    const pattern = { cmd: 'updateCity' };
    return this.cities.send(pattern, { id, ...updateCityDto });
  }

  @Delete(':id')
  remove(@Param('id') id: number): Observable<any> {
    const pattern = { cmd: 'removeCity' };
    return this.cities.send(pattern, id);
  }
}
