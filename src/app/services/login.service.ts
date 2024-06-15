import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  apiUrl: string = 'http://localhost:3000/auth/';

  constructor(private httpClient: HttpClient) {}

  Entrar(email: string, senha: string): Observable<LoginResponse> {
    return this.httpClient
      .post<LoginResponse>(this.apiUrl, { email, senha })
      .pipe(
        tap((value) => {
          sessionStorage.setItem('token', value.accessToken); // acesso
        })
      );
  }
}

export type LoginResponse = {
  accessToken: string;
};
