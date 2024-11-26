import { Controller, Post, Body, Param, Get, Query, Put, Delete } from '@nestjs/common';
import { DataUtilsService } from './DataUtils.service';

@Controller('users')
export class DataUtilsController {
  constructor(
    private readonly dataUtilsService: DataUtilsService
  ) {}

  @Get('list')
  async listarUsuarios(@Param('userID') userID: string) {
    const permissao =  this.dataUtilsService.getRoleByID(userID)
    if(!permissao || await permissao == 'cliente'){
      return {status: 403, msg: "Permissão negada", users: null}
    }

    const usuarios = await this.dataUtilsService.getAllUsersWithoutRoot()

    return {status:200, msg:"Consulta concluida", users: usuarios}
  }

  @Get('listByID/:userID/:id')
  async listarUsuarioByID(@Param('userID') userID: string, @Param('id') ID: string) {
    const permissao =  this.dataUtilsService.getRoleByID(userID)
    if(!permissao || await permissao == 'cliente'){
      return {status: 403, msg: "Permissão negada", users: null}
    }

    const usuario = await this.dataUtilsService.getUserByID(ID)

    return {status:200, msg:"Consulta concluida", users: usuario}
  }

  @Delete('/:userID/:id')
  async deleteUser(
    @Param('id') id: string, // ID do usuário que será excluído
    @Param('userId') userID: string
  ) {

    const permissao =  this.dataUtilsService.getRoleByID(userID)
    if(!permissao || await permissao == 'cliente'){
      return {status: 403, msg: "Permissão negada", users: null}
    }


    // Chama o serviço para excluir o usuário
    return this.dataUtilsService.deleteUserByID(id);
  }

  // Rota para modificar dados do usuário
  @Put('/:userID/:id')
  async updateUser(
    @Param('userID') userID: string,
    @Param('id') id: string, // ID do usuário a ser modificado
    @Body() updateData: any,
  ) {

    const permissao =  this.dataUtilsService.getRoleByID(userID)
    if(!permissao || await permissao == 'cliente'){
      return {status: 403, msg: "Permissão negada", users: null}
    }


    // Chama o serviço para atualizar o usuário
    const result = await this.dataUtilsService.updateUserByID(id, updateData);
    return result;
  }

}
