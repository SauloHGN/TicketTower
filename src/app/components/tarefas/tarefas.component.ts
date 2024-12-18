import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { lucideRefreshCcw, lucideSearch } from '@ng-icons/lucide';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { HttpClient } from '@angular/common/http';
import { SharedService } from '../../sharedService';
import { Injectable } from '@angular/core';
import { Toast, ToastrService } from 'ngx-toastr';
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

  permissao: string = '';

  constructor(
    private router: Router,
    private http: HttpClient,
    private sharedService: SharedService,
    private toastService: ToastrService
  ) {
    this.filteredTickets = this.queueTickets; // inicializa com todos os tickets
  }
  ngOnInit(): void {
    this.carregarTickets();

    const userInfoString = sessionStorage.getItem('userInfo');
    if (userInfoString) {
      const userInfo = JSON.parse(userInfoString);
      this.permissao = userInfo.permissao;
    }
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
      this.toastService.error('Erro ao se comunicar com o servidor');
    }
  }

  // Método que aplica o filtro baseado no status finalizados
  applyFilter() {
    if (this.currentFilter === 'Finalizados') {
      // Filtro para tickets que não estão "aberto" ou "em andamento"
      this.filteredTickets = this.queueTickets.filter(
        (ticket) =>
          ticket.status !== 'aberto' && ticket.status !== 'em andamento'
      );
    } else if (this.currentFilter === 'Pendentes') {
      // Filtro para tickets que não estão "fechado" ou "resolvido"
      this.filteredTickets = this.queueTickets.filter(
        (ticket) => ticket.status !== 'fechado' && ticket.status !== 'resolvido'
      );
    } else if (this.currentFilter === 'Vencidos') {
      // Filtro para tickets vencidos (com data de encerramento anterior à data atual)

      this.filteredTickets = this.queueTickets.filter((ticket) => {
        let ticketEndDate;
        let prazoResolucao;

        if (ticket.prazo_resolucao) {
          if (typeof ticket.prazo_resolucao === 'string') {
            prazoResolucao = this.convertToISO(ticket.prazo_resolucao);
          } else if (ticket.prazo_resolucao instanceof Date) {
            prazoResolucao = ticket.prazo_resolucao.toISOString();
          }
        }

        if (!prazoResolucao || isNaN(new Date(prazoResolucao).getTime())) {
          return false;
        }

        if (
          typeof ticket.data_hora_encerramento === 'string' &&
          ticket.data_hora_encerramento !== '-'
        ) {
          // Converte a data de encerramento para o formato ISO 8601
          ticketEndDate = this.convertToISO(ticket.data_hora_encerramento);
        }

        if (!ticketEndDate || isNaN(new Date(ticketEndDate).getTime())) {
          return false;
        }

        console.log('END DATE:', ticketEndDate);
        console.log('RESOLUTION DATE:', prazoResolucao);

        if (ticketEndDate > prazoResolucao) {
          console.log(`Ticket ${ticket.id} está vencido!`);
          return true;
        }

        return false; // Exclui tickets não vencidos
      });
    }
  }

  convertToISO(dateStr: string): string {
    // Verifica se a data está no formato 'dd/mm/yyyy hh:mm'
    const parts = dateStr.split(/[\/\s:]/); // Divide a string nos componentes de dia, mês, ano, hora e minuto

    if (parts.length === 5) {
      const [day, month, year, hour, minute] = parts;

      // Verifica se os componentes são válidos
      if (
        !isNaN(Number(day)) &&
        !isNaN(Number(month)) &&
        !isNaN(Number(year)) &&
        !isNaN(Number(hour)) &&
        !isNaN(Number(minute))
      ) {
        // Retorna no formato ISO 8601 'yyyy-mm-ddThh:mm:ss'
        const isoString = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}T${hour.padStart(2, '0')}:${minute.padStart(2, '0')}:00`;

        console.log("ISO String Gerada: ", isoString);  // Verificando a saída da conversão
        return isoString;
      } else {
        console.error("Data inválida:", dateStr);  // Log para caso os componentes da data sejam inválidos
        return '';
      }
    } else {
      console.error("Formato de data incorreto:", dateStr);  // Log caso o formato da data não seja válido
      return '';
    }
  }

  formatDate(date: Date): Date {
    const day = String(date.getDate()).padStart(2, '0'); // Garantir que o dia tenha 2 dígitos
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Mês começa em 0, por isso adicionamos 1
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0'); // Garantir que a hora tenha 2 dígitos
    const minutes = String(date.getMinutes()).padStart(2, '0'); // Garantir que os minutos tenham 2 dígitos

    return this.parseDate(`${day}/${month}/${year} ${hours}:${minutes}`);
  }

  currentFilter: string = 'Pendentes';
  // 1 : Pendentes (não "aberto" ou "em andamento")
  // 2 : Finalizados (não "fechado" ou "resolvido")
  // 3 : Vencidos (data de encerramento anterior à data atual)

  switchCurrentFilter() {
    if (this.currentFilter === 'Finalizados') {
      this.currentFilter = 'Vencidos';
    } else if (this.currentFilter === 'Vencidos') {
      this.currentFilter = 'Pendentes';
    } else if (this.currentFilter === 'Pendentes') {
      this.currentFilter = 'Finalizados';
    }

    // Chama a função para carregar os tickets com o filtro alterado
    this.applyFilter();
  }

  parseDate(dateString: string): Date {
    const [day, month, year, hour, minute] = dateString.split(/[\/\s:]/); // Dividindo por /, espaço e :
    const parsedDate = new Date(
      Number(year),
      Number(month) - 1,
      Number(day),
      Number(hour),
      Number(minute)
    );
    return parsedDate;
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
        this.toastService.error('Erro ao se comunicar com o servidor');
      }
    }, 500);
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
      this.toastService.error('Erro ao se comunicar com o servidor');
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
