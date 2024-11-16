import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { Funcionarios } from 'src/entity/funcionarios.entity';
import { Clientes } from 'src/entity/clientes.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CacheModule } from '@nestjs/cache-manager';
import { UsersView } from 'src/entity/usersView.entity';
import { DataUtilsService } from 'src/repository/DataUtils.service';
import { FuncionarioService } from 'src/users/funcionario/funcionario.service';
import { CadastroService } from 'src/cadastro/cadastro.service';
import { Empresas } from 'src/entity/empresas.entity';
import { Enderecos } from 'src/entity/enderecos.entity';
import { Setores } from 'src/entity/setores.entity';
import { EmailService } from 'src/email/email.service';

@Module({
  imports: [
    CacheModule.register({
      isGlobal: true,
      ttl: 1200,
      max: 2000,
    }),
    TypeOrmModule.forFeature([Funcionarios, Clientes, UsersView, Empresas, Enderecos, Setores]),
    JwtModule.register({
      secret: 'CHAVE DE SEGREDO',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, DataUtilsService, FuncionarioService, CadastroService, EmailService],
  exports: [AuthService],
})
export class AuthModule {}
