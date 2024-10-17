import { Component } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { lucidePencilLine } from '@ng-icons/lucide';

@Component({
  selector: 'app-configuracao',
  standalone: true,
  templateUrl: './configuracao.component.html',
  styleUrl: './configuracao.component.css',
  imports: [NgIconComponent],
  viewProviders: [
    provideIcons({
      lucidePencilLine,
    }),
  ],
})
export class ConfiguracaoComponent {}
