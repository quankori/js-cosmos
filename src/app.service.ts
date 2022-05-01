import { Injectable } from '@nestjs/common';
@Injectable()
export class AppService {
  getHello(): string {
    console.log(process.env.INCREMENT_CONTRACT)
    return 'Ok';
  }
}
