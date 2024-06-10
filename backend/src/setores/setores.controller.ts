import { Controller, Get } from '@nestjs/common';
import { SetoresService } from './setores.service';

@Controller('setores')
export class SetoresController {
  constructor(private readonly setoresService: SetoresService) {}

  @Get()
  async findAll() {
    return this.setoresService.findAll();
  }
}
