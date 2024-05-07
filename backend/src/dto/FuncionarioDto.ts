import { DeepPartial } from 'typeorm';
import { UsuariosDto } from './UsuariosDto';
import { Setores } from 'src/entity/setores.entity';

export class FuncionarioDto extends UsuariosDto {
  Cargo: string;
  SetorID: DeepPartial<Setores>;
}
