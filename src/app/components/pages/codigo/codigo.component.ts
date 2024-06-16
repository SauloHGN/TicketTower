import { Component, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-codigo',
  standalone: true,
  templateUrl: './codigo.component.html',
  styleUrl: './codigo.component.css',
  imports: [CommonModule],
})
export class CodigoComponent implements AfterViewInit {
  telaAtual: number = 1;

  constructor(private router: Router) {}

  ngAfterViewInit() {
    const inputs = document.querySelectorAll('.password .input');

    inputs.forEach((input, index) => {
      input.addEventListener('input', () => {
        if (
          (<HTMLInputElement>input).value.length === 1 &&
          index < inputs.length - 1
        ) {
          (<HTMLInputElement>inputs[index + 1]).focus();
        }
      });

      input.addEventListener('keydown', (event: Event) => {
        const keyboardEvent = event as KeyboardEvent;
        if (
          keyboardEvent.key === 'Backspace' &&
          (<HTMLInputElement>input).value.length === 0 &&
          index > 0
        ) {
          (<HTMLInputElement>inputs[index - 1]).focus();
        }
      });
    });
  }

  voltar() {
    this.telaAtual--;
    if (this.telaAtual <= 0) {
      this.router.navigate(['/login']);
    }
  }

  enviarEmail() {
    this.telaAtual++;
  }

  verificarCodigo() {
    this.telaAtual++;
  }

  redefinirSenha() {
    this.router.navigate(['/login']);
  }
}
