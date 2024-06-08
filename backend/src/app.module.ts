import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
// ----------------------------------------------------------------------
import { DataBaseConfigService } from './config/bd.config.service';
// ----------------------------------------------------------------------
import { AuthModule } from './auth/auth.module';
import { Funcionarios } from './entity/funcionarios.entity';
import { Clientes } from './entity/clientes.entity';
// ----------------------------------------------------------------------

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useClass: DataBaseConfigService,
      inject: [DataBaseConfigService],
    }),
    TypeOrmModule.forFeature([Funcionarios, Clientes]),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
