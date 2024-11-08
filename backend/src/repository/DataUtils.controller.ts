import { Controller, Post, Body, Param, Get, Query } from '@nestjs/common';
import { DataUtilsService } from './DataUtils.service';

@Controller('users')
export class DataUtilsController {
  constructor(
    private readonly dataUtilsService: DataUtilsService
  ) {}

  @Get('list')
  async listarUsuarios(@Body() body: {userID: string}) {
    const permissao =  this.dataUtilsService.getRoleByID(body.userID)
    if(!permissao || await permissao == 'cliente'){
      return {status: 403, msg: "Permissão negada", users: null}
    }

    const usuarios = await this.dataUtilsService.getAllUsersWithoutRoot()

    return {status:200, msg:"Consulta concluida", users: usuarios}

  }

}
