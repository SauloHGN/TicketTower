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

    try {
      await this.mailerService.sendMail({
        to: destinatario,
        subject: 'Confirmação de Registro',
        template: 'confirmar',
        context: {
          senha,
          remetente: process.env.EMAIL_USER,
          year,
          destinatario,
        },
      });
    } catch (error) {
      console.log('Não foi possivel enviar o email ERROR:', error);
      return('Não foi possivel enviar o email');
    }
  }

  sendRecuperarSenha(destinatario: string, codigo: string) {
    const year = this.getCurrentYear();

    try {
      this.mailerService.sendMail({
        to: destinatario,
        subject: 'Recuperação de Senha',
        template: 'recuperar',
        context: {
          destinatario,
          codigo,
          remetente: process.env.EMAIL_USER,
          year,
        },
      });
    } catch (error) {
      console.log('Não foi possivel enviar o email ERROR:', error);
      return('Não foi possivel enviar o email');
    }
  }

  async initPasswordRecovery(email: string) {
    try {
      console.log('Consultando email:', email);
      const resultado = await this.usersViewRepository.findOne({
        where: { email: email },
      });

      if (resultado != null) {
        const code = this.authService.gerarCodigo(6);
        console.log('Email:', email, 'Código:', code);
        await this.sendRecuperarSenha(email, code);
        const userID = await this.dataUtilsService.getIdByEmail(email);
        console.log('ID USER: ', userID);
        this.authService.salvarCodigo(userID, code);

        return true;
      }

      return false;
    } catch (error) {
      console.log('Erro ao iniciar a recuperação de senha:', error);
      return('Erro ao iniciar a recuperação de senha');
    }
  }

  async sendMessageEmail(
    destinatarioID: string,
    titulo: string,
    mensagem: string,
  ) {
    try {
      const year = this.getCurrentYear();

      const resultado = await this.usersViewRepository.findOne({
        where: { id: destinatarioID },
      });

      resultado.email;
      console.log('--------------------------------------\n', resultado);

      this.mailerService.sendMail({
        to: resultado.email,
        subject: 'Atualização Ticket Tower',
        template: 'mensagem',
        context: {
          titulo: titulo,
          destinatario: resultado.nome,
          remetente: process.env.EMAIL_USER,
          mensagem: mensagem,
          year,
        },
      });

      return { status: 200, msg: 'Email enviado!' };
    } catch (error) {
      console.log('Erro ao enviar email:', error);
      return('Erro ao iniciar ao enviar email');
    }
  }

  async authRecoveryPassword(email: string, code: string): Promise<boolean> {
    const userID = await this.dataUtilsService.getIdByEmail(email);
    return await this.authService.verificarCodigo(userID, code);
  }
}
