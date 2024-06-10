import { Module } from '@nestjs/common';
import { SetoresController } from './setores.controller';
import { Setores } from 'src/entity/setores.entity';
import { SetoresService } from './setores.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Setores])],
  controllers: [SetoresController],
  providers: [SetoresService],
})
export class SetoresModule {}
