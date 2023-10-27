import {Body, Controller, Post} from '@nestjs/common';
import { AuthService } from './auth.service';
import {ClientProxy, ClientProxyFactory, Transport} from "@nestjs/microservices";
import {Observable} from "rxjs";

@Controller('auth')
export class AuthController {
  private auth:ClientProxy

  constructor(private readonly authService: AuthService) {
    this.auth=ClientProxyFactory.create({
      transport: Transport.TCP,
      options: {
        host: '127.0.0.1',
        port: 4000
      }
    })
  }
  @Post('/test')
  getHello(@Body() payload ): Observable<any> {
    console.log('it is auth controller')
    const pattern = { cmd:'sum' };
    return this.auth.send(pattern, payload);  }
  @Post('/create')
  createClient(@Body() payload ): Observable<any> {
    console.log('it is auth controller')
    const pattern = { cmd:'createClient' };
    return this.auth.send(pattern, payload);  }
}
