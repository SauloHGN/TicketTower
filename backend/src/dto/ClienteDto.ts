import { Empresas } from '../entity/empresas.entity';

export class ClienteDTO {
  id: number;
  nome: string;
  email: string;
  senha: string;
  celular: string;
  id_empresa: Empresas;
}
