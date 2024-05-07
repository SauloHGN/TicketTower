import { DeepPartial } from 'typeorm';
import { UsuariosDto } from './UsuariosDto';
import { Empresas } from 'src/entity/empresas.entity';

export class ClienteDto extends UsuariosDto {
  IDEmpresa: DeepPartial<Empresas>;
}
