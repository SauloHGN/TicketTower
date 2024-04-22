import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  apiUrl: string = 'http://';

  constructor(private httpClient: HttpClient) {}

  Entrar(email: string, senha: string): Observable<LoginResponse> {
    return this.httpClient
      .post<LoginResponse>(this.apiUrl, { email, senha })
      .pipe(
        tap((value) => {
          sessionStorage.setItem('token', value.token);
          sessionStorage.setItem('email', value.email);
          sessionStorage.setItem('nome', value.nome);
        })
      );
  }
}

export type LoginResponse = {
  token: string;
  email: string;
  nome: string;
};
