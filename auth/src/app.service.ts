import { Injectable } from '@nestjs/common';
import {MessagePattern} from "@nestjs/microservices";
import {from, Observable} from "rxjs";

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

}
