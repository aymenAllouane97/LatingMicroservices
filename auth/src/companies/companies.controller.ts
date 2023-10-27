import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CompaniesService } from './companies.service'; // Assuming you have a CompaniesService
import { CreateCompanyDto } from './dto/create-company.dto'; // Rename the DTO
import { UpdateCompanyDto } from './dto/update-company.dto'; // Rename the DTO

@Controller('companies')
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}

  @MessagePattern({ cmd: 'createCompany' })
  create(@Payload() createCompanyDto: CreateCompanyDto) {
    return this.companiesService.create(createCompanyDto);
  }

  @MessagePattern({ cmd: 'findAllCompanies' })
  findAll() {
    return this.companiesService.findAll();
  }

  @MessagePattern({ cmd: 'findOneCompany' })
  findOne(@Payload() id: number) {
    return this.companiesService.findOne(id);
  }

  @MessagePattern({ cmd: 'updateCompany' })
  update(@Payload() updateCompanyDto: UpdateCompanyDto) {
    return this.companiesService.update(updateCompanyDto.id, updateCompanyDto);
  }

  @MessagePattern({ cmd: 'removeCompany' })
  remove(@Payload() id: number) {
    return this.companiesService.remove(id);
  }
}
