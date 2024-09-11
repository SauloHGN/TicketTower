import { Body, Controller, Post } from '@nestjs/common';
import { EmailService } from './email.service';

@Controller()
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Post('email/verificarEmail')
  initPasswordRecovery(@Body() body: { email: string }) {
    const email = body.email;
    return this.emailService.initPasswordRecovery(email);
  }

  @Post('email/verificarCodigo')
  verificarCodigo(@Body() body: { email: string; codigo: string }) {
    const email = body.email;
    const codigo = body.codigo;
    return this.emailService.authRecoveryPassword(email, codigo);
  }
}
