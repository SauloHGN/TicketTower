import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { lucideRefreshCcw, lucideSearch } from '@ng-icons/lucide';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { HttpClient } from '@angular/common/http';

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
export class TarefasComponent implements OnInit {
  selectedValue: string = 'teste';
  queueTickets: Ticket[] = [];

  filteredTickets: Ticket[] = []; // Esta será a lista filtrada
  filterText = ''; // valor do filtro (input)
  currentPage = 1; // pgina atual
  ticketsPerPage = 8; // quantidade de tickets por página

  /*queueTickets: Ticket[] = [


    {
      id: 'f47ac10b',
      abertoPor: 'Customer 1',
      prioridade: 'Urgente',
      descricao: '?',
      status: 'qualified',
      responsavel: 'N/A',
      abertura: '12/09/2024',
    },
  ];*/
  constructor(private http: HttpClient) {
    this.filteredTickets = this.queueTickets; // inicializa com todos os tickets
  }
  ngOnInit(): void {
    try {
      let userID = '';
      const userInfoString = sessionStorage.getItem('userInfo');
      if (userInfoString) {
        const userInfo = JSON.parse(userInfoString);
        userID = userInfo.id;
      } else {
        return;
      }

      this.http
        .get<{ status: number; tickets: any[] }>(
          `http://localhost:3000/ticket/${userID}`
        )
        .subscribe((data) => {
          this.filteredTickets = data.tickets;
          console.log(this.queueTickets);
        });
    } catch {
      throw new Error('Erro ao se comunicar com o servidor');
    }
  }

  filterTickets() {
    this.filteredTickets = this.queueTickets.filter((ticket) =>
      this.matchesFilter(ticket)
    );
    console.log(this.filteredTickets);
    this.currentPage = 1; // resetar para a primeira pagina
  }

  private matchesFilter(ticket: Ticket): boolean {
    // filtar dados da tabela de acordo com os atributos definidos
    const lowerCaseFilterText = this.filterText.toLowerCase();
    return (
      ticket.id.toLowerCase().includes(lowerCaseFilterText) ||
      ticket.aberto_por.toLowerCase().includes(lowerCaseFilterText) ||
      ticket.prioridade.toLowerCase().includes(lowerCaseFilterText) ||
      ticket.titulo.toLowerCase().includes(lowerCaseFilterText) ||
      ticket.status.toLowerCase().includes(lowerCaseFilterText) ||
      ticket.responsavel?.toLowerCase().includes(lowerCaseFilterText) ||
      ticket.data_hora_abertura
        .toString()
        .toLowerCase()
        .includes(lowerCaseFilterText)
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
  id: string; // ID único do ticket
  aberto_por: string; // ID do usuário que abriu o ticket
  prioridade: string; // Nível de prioridade (ex: 'alta', 'média', 'baixa')
  titulo: string; // titulo do ticket
  status: string; // Status atual do ticket (ex: 'aberto', 'encerrado')
  responsavel: string | null; // ID do responsável pelo ticket (pode ser nulo se não houver)
  data_hora_abertura: Date; // Data e hora de abertura do ticket
  data_hora_encerramento?: Date | null; // Data e hora de encerramento do ticket (opcional e pode ser nulo)
}
