import { Module } from '@nestjs/common';
import { ClienteService } from './cliente.services';
import { ClienteController } from './cliente.controller';

@Module({
  imports: [],
  controllers: [ClienteController],
  providers: [ClienteService],
})
export class ClienteModule {}
