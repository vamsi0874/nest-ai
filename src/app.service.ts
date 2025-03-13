import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';


@Injectable()
export class AppService {

  constructor(private readonly configService:ConfigService) {}


  getHello(): string {
     console.log('k',this.configService.get<string>('DATABASE_HOST'));
    return 'Hello World!';
  }

  getDatabaseHost(): any {
    return this.configService.get<string>('DATABASE_HOST');
  }
}
