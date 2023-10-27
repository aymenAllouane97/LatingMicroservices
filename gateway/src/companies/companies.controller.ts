import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ClientProxy, ClientProxyFactory, Transport } from "@nestjs/microservices";
import { Observable } from "rxjs";

@Controller('companies')
export class CompaniesController {
  private companies: ClientProxy;

  constructor() {
    this.companies = ClientProxyFactory.create({
      transport: Transport.TCP,
      options: {
        host: '127.0.0.1',
        port: 4000,
      },
    });
  }

  @Post('')
  create(@Body() createCompanyDto): Observable<any> {
    const pattern = { cmd: 'createCompany' };
    return this.companies.send(pattern, createCompanyDto);
  }

  @Get('')
  findAll(): Observable<any> {
    const pattern = { cmd: 'findAllCompanies' };
    return this.companies.send(pattern, {});
  }

  @Get(':id')
  findOne(@Param('id') id: number): Observable<any> {
    const pattern = { cmd: 'findOneCompany' };
    return this.companies.send(pattern, id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() updateCompanyDto): Observable<any> {
    const pattern = { cmd: 'updateCompany' };
    return this.companies.send(pattern, { id, ...updateCompanyDto });
  }

  @Delete(':id')
  remove(@Param('id') id: number): Observable<any> {
    const pattern = { cmd: 'removeCompany' };
    return this.companies.send(pattern, id);
  }
}
