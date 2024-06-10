import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LoginService } from '../../../services/login.service';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';
import { ToastrService } from 'ngx-toastr';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, NgxMaskPipe, NgxMaskDirective],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  providers: [LoginService],
})
export class LoginComponent {
  loginObj: LoginModel = new LoginModel();

  constructor(
    private router: Router,
    private loginService: LoginService, // Instancia da pasta Services
    private toastService: ToastrService //Lib mensagens sucesso e erros
  ) {}

  Login() {
    //Validação
    if (this.loginObj.email.length > 0 && this.loginObj.senha.length > 6) {
      this.loginService
        .Entrar(this.loginObj.email, this.loginObj.senha)
        .subscribe({
          next: (LoginResponse) => {
            const tokenJWT = LoginResponse.accessToken;
            const decode = this.decodeJWT(tokenJWT);
            sessionStorage.setItem('userInfo', JSON.stringify(decode));

            const userInfo = sessionStorage.getItem('userInfo');
            if (userInfo) {
              const user = JSON.parse(userInfo);

              if (user.defaultPass == true) {
                this.router.navigate([]);
                return;
              }
            }

            this.toastService.success('Login feito com sucesso!');
            this.router.navigate(['/home']);
          },
          error: () => {
            this.toastService.error('Erro inesperado! Tente novamente');
          },
        });
    } else {
      this.toastService.error(
        'Email ou senha inválidos. \nCertifique-se de que o Email é válido e a senha tem pelo menos 6 caracteres.'
      );
    }

    this.loginObj.email = '';
    this.loginObj.senha = '';
    return;
  }

  decodeJWT(token: string) {
    try {
      return jwtDecode(token);
    } catch (error) {
      console.error('Erro ao decodificar o token JWT', error);
      return null;
    }
  }
}

export class LoginModel {
  email: string;
  senha: string;

  constructor() {
    this.email = '';
    this.senha = '';
  }
}
