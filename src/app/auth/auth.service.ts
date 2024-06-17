import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private router: Router) {}

  isLoggedIn(): boolean {
    // const validator = localStorage.getItem('token')? true: false;
    var token = sessionStorage.getItem('token');
    console.log(token);
    if (token != null) {
      console.log('true');

      if (sessionStorage.getItem('defaultPass')) {
        this.router.navigateByUrl('/redefinir');
      }
      return true;
    } else {
      this.router.navigateByUrl('/login');
      console.log('false');
      return false;
    }
  }

  Logout() {
    // Limpar os dados de autenticação do usuário
    sessionStorage.removeItem('userInfo');
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('email');
    sessionStorage.removeItem('nome');
    sessionStorage.removeItem('tipo');
  }
}
