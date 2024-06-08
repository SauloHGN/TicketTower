import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LogoutService {
  constructor() {}

  Logout() {
    // Limpar os dados de autenticação do usuário
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('email');
    sessionStorage.removeItem('nome');
    sessionStorage.removeItem('tipo');
  }
}
