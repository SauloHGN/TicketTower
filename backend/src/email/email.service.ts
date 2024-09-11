import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersView } from 'src/entity/usersView.entity';
import { DataUtilsService } from 'src/repository/DataUtils.service';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class EmailService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly authService: AuthService,
    private readonly dataUtilsService: DataUtilsService,

    @InjectRepository(UsersView)
    private readonly usersViewRepository: Repository<UsersView>,
  ) {}

  private getCurrentYear(): number {
    const now = new Date();
    return now.getFullYear(); // Captura o ano atual
  }

  async sendConfirmarRegistro(destinatario: string, senha: string) {
    const year = this.getCurrentYear();

    await this.mailerService.sendMail({
      to: destinatario,
      subject: 'Confirmação de Registro',
      template: './confirmation',
      context: {
        senha,
        remetente: process.env.EMAIL_USER,
        year,
        destinatario,
      },
    });
  }

  sendRecuperarSenha(destinatario: string, codigo: string) {
    const year = this.getCurrentYear();

    try {
      this.mailerService.sendMail({
        to: 'Saulohgn@gmail.com',
        subject: 'Recuperação de Senha',
        template: 'confirmar',
        context: {
          destinatario,
          codigo,
          remetente: process.env.EMAIL_USER,
          year,
        },
      });
    } catch (error) {
      console.error('Não foi possivel enviar o email ERROR:', error);
      throw new Error('Não foi possivel enviar o email');
    }
  }

  async initPasswordRecovery(email: string) {
    try {
      console.log('Consultando email:', email);
      const resultado = this.usersViewRepository.findOne({
        where: { email: email },
      });

      if (resultado) {
        const code = this.authService.gerarCodigo(6);
        console.log('Email:', email, 'Código:', code);
        await this.sendRecuperarSenha(email, code);
        const userID = await this.dataUtilsService.getIdByEmail(email);
        console.log('ID USER: ', userID);
        this.authService.salvarCodigo(userID, code);
      } else {
        console.log('Nenhum registro encontrado para o email:', email);
      }

      return !!resultado; // true ou false
    } catch (error) {
      console.error('Erro ao iniciar a recuperação de senha:', error);
      throw new Error('Erro ao iniciar a recuperação de senha');
    }
  }

  async authRecoveryPassword(email: string, code: string): Promise<boolean> {
    const userID = await this.dataUtilsService.getIdByEmail(email);
    return await this.authService.verificarCodigo(userID, code);
  }
}
