import {Body, Controller, Get, Inject, Post} from '@nestjs/common';
import { AppService } from './app.service';
import {ClientProxy, ClientProxyFactory, Transport} from "@nestjs/microservices";
import {Observable} from "rxjs";

@Controller()
export class AppController {
private auth:ClientProxy
private flight:ClientProxy

  constructor(private readonly appService: AppService,
              ) {
  this.auth=ClientProxyFactory.create({
    transport: Transport.TCP,
    options: {
      host: '127.0.0.1',
      port: 4000
    }
  })
    this.flight=ClientProxyFactory.create({
      transport: Transport.TCP,
      options: {
        host: '127.0.0.1',
        port: 3002
      }
    })
  }

  @Post('/test')
  getHello(@Body() payload ): Observable<any> {
    console.log('it is iiiiiiiiiiin')
    const pattern = { cmd:'test' };
    return this.auth.send(pattern, payload);  }
  @Post('/flight')
  getFlight(@Body() payload ): Observable<any> {
    const pattern = { cmd: 'flight' };
    return this.flight.send(pattern, payload);  }
}

