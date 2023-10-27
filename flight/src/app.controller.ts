import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import {MessagePattern} from "@nestjs/microservices";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern({ cmd: 'flight' })
  async accumulate(data) {
    return data.data + 'flight bitch ass nigga'
  }
  @MessagePattern({ cmd: 'test' })
  async accumulte(data) {
    return data.data + 'flight bitch ass test'
  }
}
