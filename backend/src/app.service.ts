import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return '<div style="display:flex; justify-content:center; align-items:center; font-size:25px; font-weight:600;">Hello World! 😎</div>';
  }
}
