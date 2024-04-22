export class Funcionario {
  id: number;
  usuarioID: number;
  cargo: string;

  constructor(id: number, usuarioID: number, cargo: string) {
    this.id = id;
    this.usuarioID = usuarioID;
    this.cargo = cargo;
  }
}
