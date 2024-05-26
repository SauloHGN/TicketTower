import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.services';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() credentials: { email: string; senha: string }) {
    return this.authService.login(credentials.email, credentials.senha);
  }
}
