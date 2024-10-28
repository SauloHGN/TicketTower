import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { NotesFileComponent } from '../notes-file/notes-file.component';
import { NotesTextComponent } from '../notes-text/notes-text.component';
import {
  lucidePlus,
  lucideSendHorizontal,
  lucideX,
  lucideBuilding,
} from '@ng-icons/lucide';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ticket',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    NgIconComponent,
    NotesFileComponent,
    NotesTextComponent
  ],
  templateUrl: './ticket.component.html',
  styleUrl: './ticket.component.css',
  viewProviders: [
    provideIcons({
      lucidePlus,
      lucideSendHorizontal,
      lucideX,
      lucideBuilding,
    }),
  ],
})
export class TicketComponent implements OnInit {
  isInputDisabled: boolean = true;
  selectedType: string = '';
  options = [{ type: 'detalhes' }, { type: 'notas' }, { type: 'anexos' }];

  ticketID: string | null = '';
  dadosTicket: any;

  setores?: any[];
  selectedSetor: any;

  dadosNotas?: Nota[] = [];
  dadosAnexos?: [];

  constructor(
    private http: HttpClient,
    private activatedRoute: ActivatedRoute
  ) {
    this.selectedType = 'detalhes';

    if (this.selectedType === 'detalhes') {
      this.loadDetalhes();
    }
    if (this.selectedType === 'notas') {
    }
    if (this.selectedType === 'anexos') {
    }
  }

  ngOnInit(): void {
    this.http.get<any[]>('http://localhost:3000/setores').subscribe((data) => {
      this.setores = data;
    });
  }

  async getParamTicket(): Promise<string | null> {
    return new Promise((resolve) => {
      this.activatedRoute.paramMap.subscribe((params) => {
        const ticket = params.get('ticketID');
        resolve(ticket);
      });
    });
  }

  async loadDetalhes() {
    try {
      this.ticketID = await this.getParamTicket();
      if (this.ticketID == null) {
        return;
      }

      this.http
        .get(`http://localhost:3000/ticket/detalhes/${this.ticketID}`)
        .subscribe({
          next: async (response: any) => {
            console.log('reposta: ', response);

            if (response.status != 200) {
              return;
            }

            this.dadosTicket = response.ticket;
            console.log(this.dadosTicket);

            // Acessa os elementos do DOM e define seus valores
            (document.getElementById('id-ticket') as HTMLInputElement).value =
              this.dadosTicket.id;
            (
              document.getElementById('titulo-ticket') as HTMLInputElement
            ).value = this.dadosTicket.titulo;
            (
              document.getElementById(
                'data_abertura-ticket'
              ) as HTMLInputElement
            ).value = this.dadosTicket.data_hora_abertura;
            (
              document.getElementById(
                'prazo_encerramento-ticket'
              ) as HTMLInputElement
            ).value = this.dadosTicket.prazo_resolucao;
            (
              document.getElementById('aberto_por-ticket') as HTMLInputElement
            ).value = this.dadosTicket.aberto_por;
            (document.getElementById('tipo-ticket') as HTMLInputElement).value =
              await this.getClassificacao(this.dadosTicket.id);
            (
              document.getElementById('prioridade-ticket') as HTMLInputElement
            ).value = this.dadosTicket.prioridade;
            (
              document.getElementById('responsavel-ticket') as HTMLInputElement
            ).value = this.dadosTicket.responsavel;
            (
              document.getElementById('descricao-ticket') as HTMLInputElement
            ).value = this.dadosTicket.descricao;
          },
        });
    } catch (error) {}
  }

  async loadAnexos() {
    try {
      this.ticketID = await this.getParamTicket();

      if (this.ticketID == null) {
        return;
      }

      this.http
        .get(`http://localhost:3000/ticket/detalhes/${this.ticketID}`)
        .subscribe({
          next: async (response: any) => {
            if (response.status != 200) {
              return;
            }

            this.dadosAnexos = response.anexos;
            console.log(this.dadosAnexos);
          },
        });
    } catch (error) {}
  }

  async loadNotas() {
    try {
      this.ticketID = await this.getParamTicket();

      if (this.ticketID == null) {
        return;
      }

      this.http
        .get(`http://localhost:3000/ticket/${this.ticketID}/notas`)
        .subscribe({
          next: async (response: any) => {
            if (response.status != 200) {
              return;
            }
            this.dadosNotas = response.mensagens;
          },
        });
    } catch (error) {}
  }

  async getClassificacao(ticketID: string) {
    let classificacao = ticketID.substring(0, 2);

    switch (classificacao) {
      case 'SS':
        return (classificacao = 'solicitação de serviço');

      case 'CH':
        return (classificacao = 'mudança');

      case 'IN':
        return (classificacao = 'incidente');

      default:
        return (classificacao = '');
    }
  }

  selectOption(option: any) {
    this.selectedType = option;

    switch (option) {
      case 'detalhes':
        this.loadDetalhes();
        return;

      case 'anexos':
        this.loadAnexos();
        return;

      case 'notas':
        this.loadNotas();
        return;

      default:
        return;
    }
  }

  setorChange() {
    
  }

  popoverVisible: boolean = false;

  togglePopover() {
    this.popoverVisible = !this.popoverVisible;
  }
}

export interface Nota {
  mensagemID: number,
  nome: string;
  data_hora: string;
  mensagem: string;
}
