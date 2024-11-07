import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { lucideRefreshCcw, lucideSearch } from '@ng-icons/lucide';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { HttpClient } from '@angular/common/http';
import { SharedService } from '../../sharedService';
import { Injectable } from '@angular/core';
import { Toast } from 'ngx-toastr';
import { Router, RouterLink } from '@angular/router';
import { tick } from '@angular/core/testing';

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

  currentFilterFinalizados = false;

  constructor(
    private router: Router,
    private http: HttpClient,
    private sharedService: SharedService
  ) {
    this.filteredTickets = this.queueTickets; // inicializa com todos os tickets
  }
  ngOnInit(): void {
    this.carregarTickets();
  }

  // Método para carregar os tickets com base no filtro atual
  carregarTickets() {
    try {
      let userID = '';
      const userInfoString = sessionStorage.getItem('userInfo');
      if (userInfoString) {
        const userInfo = JSON.parse(userInfoString);
        userID = userInfo.id;
      } else {
        return;
      }

      // Chamada à API para buscar os tickets
      this.http
        .get<{ status: number; tickets: any[] }>(
          `http://localhost:3000/ticket/${userID}`
        )
        .subscribe((data) => {
          this.queueTickets = data.tickets; // Armazena todos os tickets

          // Aplica o filtro dependendo do status de currentFilterFinalizados
          this.applyFilter();
        });
    } catch {
      throw new Error('Erro ao se comunicar com o servidor');
    }
  }

  // Método que aplica o filtro baseado no status finalizados
  applyFilter() {
    if (this.currentFilterFinalizados) {
      // Se o filtro for "finalizados", mostra tickets que não sejam "aberto" ou "em andamento"
      this.filteredTickets = this.queueTickets.filter(
        (ticket) =>
          ticket.status !== 'aberto' && ticket.status !== 'em andamento'
      );
    } else {
      // Caso contrário, exibe os tickets que não estejam "fechado" ou "resolvido"
      this.filteredTickets = this.queueTickets.filter(
        (ticket) => ticket.status !== 'fechado' && ticket.status !== 'resolvido'
      );
    }
  }

  switchCurrentFilter() {
    this.currentFilterFinalizados = !this.currentFilterFinalizados;
    console.log(this.currentFilterFinalizados);
    this.carregarTickets();
  }

  filterTickets() {
    this.filteredTickets = this.queueTickets
      .filter((ticket) => this.matchesStatusFilter(ticket))
      .filter((ticket) => this.matchesFilter(ticket)); // Aplica o filtro de texto

    this.currentPage = 1; // resetar para a primeira pagina
  }

  matchesStatusFilter(ticket: Ticket): boolean {
    // Filtra os tickets de acordo com o status (se estiver filtrando por status, por exemplo)
    if (!this.currentFilterFinalizados) {
      return ticket.status !== 'fechado' && ticket.status !== 'resolvido';
    }
    return ticket.status !== 'aberto' && ticket.status !== 'em andamento';
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
    setTimeout(() => {
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
            if (this.currentFilterFinalizados == true) {
              this.filteredTickets = this.queueTickets = data.tickets.filter(
                (ticket) =>
                  ticket.status !== 'aberto' && ticket.status !== 'em andamento'
              );
            }

            this.filteredTickets = this.queueTickets = data.tickets.filter(
              (ticket) =>
                ticket.status !== 'fechado' && ticket.status !== 'resolvido'
            );
          });
      } catch {
        throw new Error('Erro ao se comunicar com o servidor');
      }
    }, 10000);
  }

  adotarTicket(id: string) {
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
        .patch<{ message: string }>(`http://localhost:3000/ticket/adotar`, {
          userID: userID,
          ticketID: id,
        })
        .subscribe((data) => {
          this.loadTicket();
        });
    } catch (error) {
      throw new Error('Erro ao se comunicar com o servidor');
    }
  }

  gerenciarTicket(id: string) {
    this.sharedService.updateItemName('Detalhes do Ticket');

    this.router.navigate([`home/ticket/${id}`]);
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
  prazo_resposta?: Date;
  prazo_resolucao?: Date;
}
