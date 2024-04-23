import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LoginService } from '../../../services/login.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginObj: LoginModel = new LoginModel();

  constructor(
    private router: Router,
    private loginService: LoginService, // Instancia da pasta Services
    private toastService: ToastrService //Lib mensagens sucesso e erros
  ) {}

  Login() {
    //console.log('Clicado');
    //console.log('email', this.loginObj.email);
    //console.log('senha', this.loginObj.senha);

    //Validação
    if (this.loginObj.email.length > 0 && this.loginObj.senha.length > 6) {
      this.loginService
        .Entrar(this.loginObj.email, this.loginObj.senha)
        .subscribe({
          next: () => {
            this.toastService.success('Login feito com sucesso!');
            this.router.navigate(['/home']);
          },
          error: () => {
            this.toastService.error('Erro inesperado! Tente novamente');
          },
        });
    } else {
      this.toastService.error('Email ou senha fora do padrão');
    }

    this.loginObj.email = '';
    this.loginObj.senha = '';
    return;
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
