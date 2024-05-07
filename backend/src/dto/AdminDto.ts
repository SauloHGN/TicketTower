import { DeepPartial } from 'typeorm';
import { UsuariosDto } from './UsuariosDto';
import { Usuarios } from 'src/entity/usuario.entity';
import { Setores } from 'src/entity/setores.entity';

export class AdminDto extends UsuariosDto {
  UsuarioID: DeepPartial<Usuarios>;

  SetorID: DeepPartial<Setores>;
}
