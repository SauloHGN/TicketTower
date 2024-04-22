export class Usuario {
  id: number;
  nome: string;
  email: string;
  telefone?: string;

  constructor(id: number, nome: string, email: string, telefone: string) {
    this.id = id;
    this.nome = nome;
    this.email = email;
    this.telefone = telefone;
  }
}
