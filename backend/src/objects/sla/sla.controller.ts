import { Body, Controller, Post } from '@nestjs/common';
import { SlaService } from './sla.service';

@Controller('sla')
export class SlaController {
  constructor(private slaService: SlaService) {}

  @Post('/')
  async setSLA(@Body() dadosSLA: any) {
    const { userID, ...slaData } = dadosSLA;
    const result = this.slaService.setSLA(userID, slaData);

    return result;
  }
}
