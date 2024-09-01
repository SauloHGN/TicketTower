import { Body, Controller, Post } from '@nestjs/common';
import { EmailService } from './email.service';

@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Post('email/verificarEmail')
  initPasswordRecovery(@Body() email: string) {
    return this.emailService.initPasswordRecovery(email);
  }

  @Post('email/verificarCodigo')
  verificarCodigo(@Body() email: string, codigo: string) {
    return this.emailService.authRecoveryPassword(email, codigo);
  }
}
