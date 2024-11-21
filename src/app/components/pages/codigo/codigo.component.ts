import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { sleep } from '../../../sharedService';

@Component({
  selector: 'app-codigo',
  standalone: true,
  templateUrl: './codigo.component.html',
  styleUrl: './codigo.component.css',
  imports: [CommonModule],
})
export class CodigoComponent {
  telaAtual: number = 1;
  inputValues: string[] = ['', '', '', '', '', ''];

  codigo: string = '';
  email: string = '';
  novaSenha: string = '';
  confirmarSenha: string = '';

  @ViewChild('passwordContainer', { static: false })
  passwordContainer!: ElementRef;

  constructor(
    private router: Router,
    private httpClient: HttpClient,
    private toastService: ToastrService
  ) {}

  onInput(event: Event, index: number) {
    const inputs = document.querySelectorAll('.password .input');
    const input = event.target as HTMLInputElement;

    if (input.value.length === 1 && index < inputs.length - 1) {
      (inputs[index + 1] as HTMLInputElement).focus();
    }
  }

  onKeyDown(event: KeyboardEvent, index: number) {
    const inputs = document.querySelectorAll('.password .input');
    const input = event.target as HTMLInputElement;

    if (event.key === 'Backspace' && input.value.length === 0 && index > 0) {
      (inputs[index - 1] as HTMLInputElement).focus();
    }
  }

  voltar() {
    this.telaAtual--;
    if (this.telaAtual <= 0) {
      this.limparDados();
      this.router.navigate(['/login']);
    }
  }

  limparDados() {
    this.inputValues = ['', '', '', '', '', ''];
    this.codigo = '';
    this.email = '';
    this.novaSenha = '';
    this.confirmarSenha = '';
  }

  validarEmail(email: string) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  enviarEmail() {
    const apiUrl = 'http://localhost:3000/email/verificarEmail';
    const email = document.querySelector('.email') as HTMLInputElement;

    this.email = email.value;

    if (this.email == null || this.validarEmail(this.email) == false) {
      this.toastService.info('Formato de email invalido...');
      return;
    }

    this.httpClient
      .post(apiUrl, { email: this.email })
      .pipe(
        map((response) => {
          return response;
        }),
        catchError((error) => {
          console.error('Erro na requisição:', error);
          return error;
        })
      )
      .subscribe((result) => {
        if (result != true) {
          this.toastService.error('Email incorreto ou não cadastrado.');
          return;
        }

        this.telaAtual++;
      });

    console.log(email.value);
  }

  verificarCodigo() {
    const apiUrl = 'http://localhost:3000/email/verificarCodigo';
    const inputs =
      this.passwordContainer.nativeElement.querySelectorAll('.input');

    inputs.forEach((input: HTMLInputElement) => {
      this.codigo += input.value;
    });

    if (this.codigo.length < 6) {
      this.toastService.info('O código precisa ter no mínimo 6 caracteres.');
      return;
    }

    this.httpClient
      .post(apiUrl, { email: this.email, codigo: this.codigo })
      .pipe(
        map((response) => {
          return response;
        }),
        catchError((error) => {
          console.error('Erro na requisição:', error);
          return error;
        })
      )
      .subscribe((result) => {
        if (result != true) {
          this.toastService.error('Código incorreto... Tente novamente.');
          return;
        }
      });

    console.log('Código completo:', this.codigo);

    this.telaAtual++;
  }

  async redefinirSenha() {
    const apiUrl = 'http://localhost:3000/auth/redefinirSenha';
    const novaSenha = document.querySelector('.novaSenha') as HTMLInputElement;
    const confirmarSenha = document.querySelector(
      '.confirmarSenha'
    ) as HTMLInputElement;

    this.novaSenha = novaSenha.value;
    this.confirmarSenha = confirmarSenha.value;

    if (
      !this.novaSenha ||
      !this.confirmarSenha ||
      this.novaSenha.length < 8 ||
      this.confirmarSenha.length < 8
    ) {
      this.toastService.info('A senha deve ter pelo menos 8 caracteres.');
      return;
    }

    if (this.novaSenha !== this.confirmarSenha) {
      this.toastService.info('As senhas devem ser iguais.');
      return;
    }

    await this.httpClient
      .post(apiUrl, {
        email: this.email,
        codigo: this.codigo,
        senha: this.novaSenha,
      })
      .pipe(
        map((response) => {
          return response;
        }),
        catchError((error) => {
          console.error('Erro na requisição:', error);
          return error;
        })
      )
      .subscribe((result) => {
        if (result != true) {
          this.toastService.error(
            'Não foi possível alterar a senha. \n Tente novamente...'
          );
          return;
        }
      });

    this.toastService.success('Senha alterada com sucesso!');

    await sleep(1000);

    this.limparDados();
    this.router.navigate(['/login']);
  }
}
