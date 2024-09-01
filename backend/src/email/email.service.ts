import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { InjectRepository } from '@nestjs/typeorm';
import { Funcionarios } from '../entity/funcionarios.entity';
import { Clientes } from 'src/entity/clientes.entity';
import { Repository } from 'typeorm';
import { DataUtilsService } from 'src/repository/DataUtilsService';
import { AuthService } from 'src/auth/auth.services';
import { UsersView } from 'src/entity/usersView.entity';

@Injectable()
export class EmailService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly authService: AuthService,

    @InjectRepository(Clientes)
    private clienteRepository: Repository<Clientes>,
    @InjectRepository(Funcionarios)
    private funcionarioRepository: Repository<Funcionarios>,
    @InjectRepository(UsersView)
    private usersViewRepository: Repository<UsersView>,

    @InjectRepository(DataUtilsService)
    private readonly dataUtilsService: DataUtilsService,
  ) {}

  private getCurrentYear(): number {
    const now = new Date();
    return now.getFullYear(); // Captura o ano atual
  }

  async SendConfirmarRegistro(destinatario: string, senha: string) {
    const year = this.getCurrentYear();

    await this.mailerService.sendMail({
      to: destinatario,
      subject: 'Confirmação de Registro',
      template: './confirmation',
      context: {
        // dados passados para o template
        senha,
        remetente: process.env.EMAIL_USER,
        year,
        destinatario,
      },
    });
  }

  async SendRecuperarSenha(destinatario: string, codigo: string) {
    const year = this.getCurrentYear();

    await this.mailerService.sendMail({
      to: destinatario,
      subject: 'Confirmação de Registro',
      template: './confirmation',
      context: {
        // dados passados para o template
        codigo,
        remetente: process.env.EMAIL_USER,
        year,
      },
    });
  }

  async initPasswordRecovery(email: string): Promise<boolean> {
    const resultado = await this.usersViewRepository.findOne({
      where: { email },
    }); // verificar email

    if (resultado !== null) {
      const code = this.authService.gerarCodigo(6);
      this.SendRecuperarSenha(email, await code);
      const userID = this.dataUtilsService.getIdByEmail(email);
      this.authService.salvarCodigo(await userID, await code);
    }

    return resultado ? resultado !== null : false; //true or false
  }

  async authRecoveryPassword(email: string, code: string): Promise<boolean> {
    const userID = this.dataUtilsService.getIdByEmail(email);
    const response = this.authService.verificarCodigo(await userID, code);
    return response;
  }
}
