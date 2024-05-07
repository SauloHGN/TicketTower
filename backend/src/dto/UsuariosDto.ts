export class UsuariosDto {
  Nome: string;
  Email: string;
  Telefone: string;
  Tipo: 'Funcionario' | 'Admin' | 'Cliente';
}
