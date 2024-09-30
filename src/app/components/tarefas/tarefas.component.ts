import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { lucideRefreshCcw, lucideSearch } from '@ng-icons/lucide';
import { NgIconComponent, provideIcons } from '@ng-icons/core';

@Component({
  selector: 'app-tarefas',
  standalone: true,
  templateUrl: './tarefas.component.html',
  styleUrl: './tarefas.component.css',
  imports: [CommonModule, FormsModule, NgIconComponent],
  viewProviders: [
    provideIcons({
      lucideRefreshCcw,
      lucideSearch,
    }),
  ],
})
export class TarefasComponent {
  selectedValue: string = 'teste';

  queueTickets: Ticket[] = [
    {
      id: 'f47ac10b',
      abertoPor: 'Customer 1',
      prioridade: 'Urgente',
      descricao: '?',
      status: 'qualified',
      responsavel: 'N/A',
      abertura: '12/09/2024',
    },
    {
      id: 'a3c6e54d',
      abertoPor: 'Customer 1',
      prioridade: 'Média',
      descricao: '?',
      status: 'qualified',
      responsavel: 'true',
      abertura: '12/09/2024',
    },
    {
      id: '7c9f0b62',
      abertoPor: 'Customer 1',
      prioridade: 'Normal',
      descricao: '?',
      status: 'qualified',
      responsavel: 'true',
      abertura: '12/09/2024',
    },
    {
      id: 'a2c5f77e',
      abertoPor: 'Customer 1',
      prioridade: 'Alta',
      descricao: '?',
      status: 'qualified',
      responsavel: 'true',
      abertura: '08/09/2024',
    },
    {
      id: '1d9e0f32',
      abertoPor: 'Customer 1',
      prioridade: 'Média',
      descricao: '?',
      status: 'qualified',
      responsavel: 'N/A',
      abertura: '07/09/2024',
    },
    {
      id: 'b6a1d24c',
      abertoPor: 'Customer 1',
      prioridade: 'Média',
      descricao: '?',
      status: 'qualified',
      responsavel: 'TESTE',
      abertura: '07/09/2024',
    },
    {
      id: 'b6a1d24c',
      abertoPor: 'Customer 1',
      prioridade: 'Média',
      descricao: '?',
      status: 'qualified',
      responsavel: 'TESTE',
      abertura: '07/09/2024',
    },
    {
      id: 'b6a1d24c',
      abertoPor: 'Customer 1',
      prioridade: 'Média',
      descricao: '?',
      status: 'qualified',
      responsavel: 'TESTE',
      abertura: '07/09/2024',
    },
    {
      id: 'b6a1d24c',
      abertoPor: 'Customer 1',
      prioridade: 'Média',
      descricao: '?',
      status: 'qualified',
      responsavel: 'TESTE',
      abertura: '07/09/2024',
    },
  ];

  filteredTickets: Ticket[] = []; // Esta será a lista filtrada
  filterText = ''; // valor do filtro (input)
  currentPage = 1; // pgina atual
  ticketsPerPage = 8; // quantidade de tickets por página

  constructor() {
    this.filteredTickets = this.queueTickets; // inicializa com todos os tickets
  }

  filterTickets() {
    this.filteredTickets = this.queueTickets.filter((ticket) =>
      this.matchesFilter(ticket)
    );
    this.currentPage = 1; // resetar para a primeira pagina
  }

  private matchesFilter(ticket: Ticket): boolean {
    // filtar dados da tabela de acordo com os atributos definidos
    const lowerCaseFilterText = this.filterText.toLowerCase();
    return (
      ticket.id.toLowerCase().includes(lowerCaseFilterText) ||
      ticket.abertoPor.toLowerCase().includes(lowerCaseFilterText) ||
      ticket.prioridade.toLowerCase().includes(lowerCaseFilterText) ||
      ticket.descricao.toLowerCase().includes(lowerCaseFilterText) ||
      ticket.status.toLowerCase().includes(lowerCaseFilterText) ||
      ticket.responsavel.toLowerCase().includes(lowerCaseFilterText) ||
      ticket.abertura.toLowerCase().includes(lowerCaseFilterText)
    );
  }

  get paginatedTickets() {
    const startIndex = (this.currentPage - 1) * this.ticketsPerPage;
    return this.filteredTickets.slice(
      startIndex,
      startIndex + this.ticketsPerPage
    );
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  get totalPages() {
    return Math.ceil(this.filteredTickets.length / this.ticketsPerPage);
  }

  loadTicket() {
    const id = sessionStorage.getItem('userInfo');
  }
}

interface Ticket {
  id: string;
  abertoPor: string;
  prioridade: string;
  descricao: string;
  status: string;
  responsavel: string;
  abertura: string;
}
