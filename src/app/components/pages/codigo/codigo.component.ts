import { Component, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-codigo',
  standalone: true,
  templateUrl: './codigo.component.html',
  styleUrl: './codigo.component.css',
  imports: [],
})
export class CodigoComponent implements AfterViewInit {
    ngAfterViewInit() {
      const inputs = document.querySelectorAll('.password .input');
  
      inputs.forEach((input, index) => {
        input.addEventListener('input', () => {
          if ((<HTMLInputElement>input).value.length === 1 && index < inputs.length - 1) {
            (<HTMLInputElement>inputs[index + 1]).focus();
          }
        });
  
        input.addEventListener('keydown', (event: Event) => {
          const keyboardEvent = event as KeyboardEvent;
          if (keyboardEvent.key === 'Backspace' && (<HTMLInputElement>input).value.length === 0 && index > 0) {
            (<HTMLInputElement>inputs[index - 1]).focus();
          }
        });
      });
    }
  }
