import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post()
  async login(@Body() credentials: { email: string; senha: string }) {
    return this.authService.login(credentials.email, credentials.senha);
  }

  @Post('/redefinirSenha')
  async redefinirSenha(
    @Body() body: { email: string; codigo: string; senha: string },
  ) {
    const result = await this.authService.redefinirSenha(
      body.email,
      body.codigo,
      body.senha,
    );
    return result;
  }
}
