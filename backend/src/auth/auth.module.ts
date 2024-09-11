import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { Funcionarios } from 'src/entity/funcionarios.entity';
import { Clientes } from 'src/entity/clientes.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [
    CacheModule.register(),
    TypeOrmModule.forFeature([Funcionarios, Clientes]),
    JwtModule.register({
      secret: 'CHAVE DE SEGREDO',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
