import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { DropdownModule } from 'primeng/dropdown';
import { ChipsModule } from 'primeng/chips';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { lucideRefreshCcw } from '@ng-icons/lucide';
import { NgIconComponent, provideIcons } from '@ng-icons/core';

@Component({
  selector: 'app-tarefas',
  standalone: true,
  templateUrl: './tarefas.component.html',
  styleUrl: './tarefas.component.css',
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    InputTextModule,
    MultiSelectModule,
    DropdownModule,
    ChipsModule,
    TagModule,
    ButtonModule,
    NgIconComponent,
  ],
  viewProviders: [
    provideIcons({
      lucideRefreshCcw,
    }),
  ],
})
export class TarefasComponent {
  selectedValue: string = 'teste';

  customers = [
    {
      name: 'Customer 1',
      country: 'Brasil',
      agent: '?',
      status: 'qualified',
      verified: 'true',
    },
    {
      name: 'Customer 1',
      country: 'Brasil',
      agent: '?',
      status: 'qualified',
      verified: 'true',
    },
    {
      name: 'Customer 1',
      country: 'Brasil',
      agent: '?',
      status: 'qualified',
      verified: 'true',
    },
    {
      name: 'Customer 1',
      country: 'Brasil',
      agent: '?',
      status: 'qualified',
      verified: 'true',
    },
    {
      name: 'Customer 1',
      country: 'Brasil',
      agent: '?',
      status: 'qualified',
      verified: 'true',
    },
  ];

  loading = [
    { name: 'loading 1' },
    { name: 'loading 2' },
    { name: 'loading 3' },
  ];

  tags: string[] = [];

  dt2!: any;
  representatives: any[] | undefined;
  statuses: any[] | undefined;

  onFilterInput(event: any) {
    const value = (event.target as HTMLInputElement).value;
    this.dt2.filterGlobal(value, 'contains');
  }

  getSeverity(
    status: string
  ):
    | 'success'
    | 'secondary'
    | 'info'
    | 'warning'
    | 'danger'
    | 'contrast'
    | undefined {
    switch (status) {
      case 'Active':
        return 'success';
      case 'Inactive':
        return 'secondary';
      case 'Pending':
        return 'warning';
      case 'Completed':
        return 'info';
      case 'Rejected':
        return 'danger';
      default:
        return undefined;
    }
  }

  filter(selectedValues: any[]) {
    // Use this.selectedRepresentatives instead of value
  }
}
