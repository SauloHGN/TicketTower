import { Permissao } from 'src/enums/permissao';
import { Setores } from '../entity/setores.entity';

export class FuncionarioDTO {
  nome: string;
  email: string;
  senha: string;
  celular: string;
  cargo: string;
  permissao: Permissao;
  id_setor: Setores;
}
