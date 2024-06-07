import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.services';
import { Funcionarios } from 'src/entity/funcionarios.entity';
import { Clientes } from 'src/entity/clientes.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([Funcionarios, Clientes]),
    JwtModule.register({
      secret: 'CHAVE DE SEGREDO',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
