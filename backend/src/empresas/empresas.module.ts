import { Module } from '@nestjs/common';
import { Empresas } from 'src/entity/empresas.entity';
import { EmpresasController } from './empresas.controller';
import { EmpresasService } from './empresas.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Empresas])],
  controllers: [EmpresasController],
  providers: [EmpresasService],
})
export class EmpresasModule {}
