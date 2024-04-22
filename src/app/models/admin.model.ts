export class Admin {
  id: number;
  usuarioID: number;
  setorID: number;

  constructor(id: number, usuarioID: number, setorID: number) {
    this.id = id;
    this.usuarioID = usuarioID;
    this.setorID = setorID;
  }
}
