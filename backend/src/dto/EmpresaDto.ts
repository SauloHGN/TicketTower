import { Enderecos } from '../entity/enderecos.entity';

export class EmpresaDTO {
  id: number;
  nome: string;
  cnpj: string;
  id_endereco: Enderecos;
}
