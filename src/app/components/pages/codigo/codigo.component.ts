import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

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
  @ViewChild('passwordContainer', { static: false })
  passwordContainer!: ElementRef;

  constructor(private router: Router) {}

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
      this.router.navigate(['/login']);
    }
  }

  enviarEmail() {
    this.telaAtual++;
  }

  verificarCodigo() {
    const inputs =
      this.passwordContainer.nativeElement.querySelectorAll('.input');
    let codigo = '';

    inputs.forEach((input: HTMLInputElement) => {
      codigo += input.value;
    });

    console.log('Código completo:', codigo);

    this.telaAtual++;
  }

  redefinirSenha() {
    this.router.navigate(['/login']);
  }
}
