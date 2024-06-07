import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.services';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post()
  async login(@Body() credentials: { email: string; senha: string }) {
    return this.authService.login(credentials.email, credentials.senha);
  }
}
