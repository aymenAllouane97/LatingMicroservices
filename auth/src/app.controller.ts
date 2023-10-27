import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import {MessagePattern} from "@nestjs/microservices";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern({ cmd: 'sum' })
  async accumulate(data) {
    return data.data +"haahaaa"
  }
  @MessagePattern({ cmd: 'test' })
  async test(data) {
    return data.data +"testooo"
  }
}
