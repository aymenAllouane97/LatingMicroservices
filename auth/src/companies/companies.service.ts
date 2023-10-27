import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { Company } from './entities/company.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class CompaniesService {
  constructor(
      @InjectRepository(Company)
      private companiesRepository: Repository<Company>,
  ) {}

  async create(createCompanyDto: CreateCompanyDto): Promise<Company> {
    const { name, password, email } = createCompanyDto;
    const hashedPassword = await bcrypt.hash(password, 10);

    const company = this.companiesRepository.create({
      name,
      password: hashedPassword,
      email,
    });

    try {
      return await this.companiesRepository.save(company);
    } catch (error) {
      throw new InternalServerErrorException('Could not create company');
    }
  }

  async findAll(): Promise<Company[]> {
    return await this.companiesRepository.find();
  }

  async findOne(id: number): Promise<Company> {
    const company = await this.companiesRepository.findOne({ where: { id } });
    if (!company) {
      throw new NotFoundException('Company not found');
    }
    return company;
  }

  async update(id: number, updateCompanyDto: UpdateCompanyDto): Promise<Company> {
    const { name, password, email } = updateCompanyDto;
    const company = await this.findOne(id);

    if (name) company.name = name; // Rename the variable
    if (password) company.password = await bcrypt.hash(password, 10);
    if (email) company.email = email;

    try {
      await this.companiesRepository.save(company);
      return company;
    } catch (error) {
      throw new InternalServerErrorException('Could not update company');
    }
  }

  async remove(id: number): Promise<void> {
    const company = await this.findOne(id);

    try {
      await this.companiesRepository.remove(company);
    } catch (error) {
      throw new InternalServerErrorException('Could not delete company');
    }
  }
}
