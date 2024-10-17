import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { lucidePlus, lucideSendHorizontal } from '@ng-icons/lucide';

@Component({
  selector: 'app-ticket',
  standalone: true,
  imports: [FormsModule, CommonModule, NgIconComponent],
  templateUrl: './ticket.component.html',
  styleUrl: './ticket.component.css',
  viewProviders: [
    provideIcons({
      lucidePlus,
      lucideSendHorizontal
    })
  ]
})
export class TicketComponent {
  isInputDisabled: boolean = true;
  selectedType: string = '';
  options = [{ type: 'detalhes' }, { type: 'chat' }];

  constructor() {
    this.selectedType = 'detalhes';

    if (this.selectedType === 'detalhes') {

    }
    if (this.selectedType === 'chat') {

    }
  }

  selectOption(option: any) {
    this.selectedType = option;
  }
}
