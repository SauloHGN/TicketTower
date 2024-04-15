import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginObj: LoginModel = new LoginModel();

  constructor(private router: Router) {}

  Login() {
    console.log('Clicado');
    console.log('email', this.loginObj.email);
    console.log('senha', this.loginObj.senha);
    //this.router.navigate(['/home']);

    this.loginObj.senha = '';
    this.loginObj.email = '';
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
