import { Module } from '@nestjs/common';
import { CadastroController } from './cadastro.controller';
import { CadastroService } from './cadastro.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Funcionarios } from 'src/entity/funcionarios.entity';
import { Clientes } from 'src/entity/clientes.entity';
import { Empresas } from 'src/entity/empresas.entity';
import { Setores } from 'src/entity/setores.entity';
import { Enderecos } from 'src/entity/enderecos.entity';
import { EmpresasService } from 'src/empresas/empresas.service';
import { AuthService } from 'src/auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { DataUtilsService } from 'src/repository/DataUtils.service';
import { UsersView } from 'src/entity/usersView.entity';
import { EmailService } from 'src/email/email.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Funcionarios,
      Clientes,
      Empresas,
      Setores,
      Enderecos,
      UsersView
    ]),
  ],
  controllers: [CadastroController],
  providers: [CadastroService, EmpresasService, AuthService, JwtService, DataUtilsService, EmailService],
})
export class CadastroModule {}
