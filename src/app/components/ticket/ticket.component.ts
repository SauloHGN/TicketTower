import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-ticket',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    NgIconComponent,
    NotesFileComponent,
    NotesTextComponent,
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
  options = [
    { type: 'detalhes' },
    { type: 'notas' },
    { type: 'anexos' },
    { type: 'histórico' },
  ];

  ticketID: string | null = '';
  dadosTicket: any;

  setores?: any[];
  selectedSetor: any;

  dadosNotas?: Nota[] = [];
  dadosAnexos?: Anexo[] = [];

  dadosHistorico?: HistoricoTranferencia[] = [];

  showButtons: boolean = false;

  permissao: string = '';

  constructor(
    private http: HttpClient,
    private activatedRoute: ActivatedRoute,
    private serviceToast: ToastrService
  ) {
    this.selectedType = 'detalhes';

    if (this.selectedType === 'detalhes') {
      this.loadDetalhes();
    }
    if (this.selectedType === 'notas') {
      this.loadNotas();
    }
    if (this.selectedType === 'anexos') {
      this.loadAnexos();
    }
    if (this.selectedType === 'histórico') {
    }
  }

  ngOnInit(): void {
    this.http.get<any[]>('http://localhost:3000/setores').subscribe((data) => {
      this.setores = data;
    });

    const userInfoString = sessionStorage.getItem('userInfo');
    if (userInfoString) {
      const userInfo = JSON.parse(userInfoString);
      this.permissao = userInfo.permissao;
    }
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
            if (response.status != 200) {
              return;
            }

            this.dadosTicket = response.ticket;

            if (this.dadosTicket.status != 'resolvido') {
              this.showButtons = true;
            }

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
            (
              document.getElementById('setor-ticket') as HTMLInputElement
            ).value = this.dadosTicket.id_setor.nome;
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
        .get(`http://localhost:3000/ticket/${this.ticketID}/anexos`)
        .subscribe({
          next: async (response: any) => {
            if (response.status != 200) {
              return;
            }

            this.dadosAnexos = response.anexos;
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
            this.scrollToBottom();
          },
        });
    } catch (error) {}
  }

  async loadHistorico() {
    try {
      this.ticketID = await this.getParamTicket();

      if (this.ticketID == null) {
        return;
      }

      this.http
        .get(`http://localhost:3000/ticket/${this.ticketID}/historicoSetor`)
        .subscribe({
          next: async (response: any) => {
            if (response.status != 200) {
              return;
            }
            this.dadosHistorico = response.transferencias.map(
              (transferencia: {
                dataTransferencia: any;
                setorAnterior: { nome: any };
                setorNovo: { nome: any };
                usuario: any;
              }) => ({
                dataTransferencia: transferencia.dataTransferencia,
                setorAntigo: transferencia.setorAnterior.nome, // Acessando o nome do setor anterior
                setorNovo: transferencia.setorNovo.nome, // Acessando o nome do setor novo
                user: transferencia.usuario, // Acessando o e-mail do usuário
              })
            );
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
        this.scrollToBottom();
        return;

      case 'histórico':
        this.loadHistorico();
        return;

      default:
        return;
    }
  }

  anexo: File | null = null; // Variável para armazenar o arquivo

  onFileSelected(event: Event): void {
    const inputFile = event.target as HTMLInputElement;

    if (inputFile && inputFile.files) {
      const files = inputFile.files;
      if (files.length > 0) {
        this.anexo = files[0]; // Armazena o arquivo selecionado na variável `anexo`
      }
    }

    if (!this.anexo) {
      this.serviceToast.info('A nota não pode ser vazia');
    }
  }

  async criarNota() {
    try {
      const userInfo = await sessionStorage.getItem('userInfo');
      if (userInfo) {
        var user = JSON.parse(userInfo);
      }

      const ticket = await this.getParamTicket();
      if (ticket == null) {
        this.serviceToast.info('Não foi possivel criar a nota');
        return;
      }

      const mensagem = (
        document.getElementById('text-nota') as HTMLInputElement
      ).value;

      if (!mensagem && !this.anexo) {
        this.serviceToast.info('Não é possivel criar uma nota vazia.');
        return;
      }

      const formData = new FormData();
      formData.set('remetenteID', user.id);
      formData.set('mensagem', mensagem);
      if (this.anexo) {
        formData.set('file', this.anexo); // Aqui você adiciona o arquivo ao FormData
      }

      this.http
        .post(`http://localhost:3000/ticket/${ticket}/criarNota`, formData)
        .subscribe({
          next: (response: any) => {
            if (response.status != 201) {
              this.serviceToast.error('Não foi possivel criar a nota');
              this.togglePopover();
              return;
            }

            (document.getElementById('text-nota') as HTMLInputElement).value =
              '';
            this.loadNotas();
            this.scrollToBottom();
            this.anexo = null;
            this.fileName = '';
          },
        });
    } catch (error) {}
  }

  downloadAnexo(anexoId: number, anexoName: string) {
    const url = `http://localhost:3000/ticket/download/${anexoId}`;
    this.http.get(url, { responseType: 'blob' }).subscribe(
      (blob: Blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${anexoName}`; // Nome padrão
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url); // Limpa o objeto URL
      },
      (error) => {
        console.error('Erro ao baixar o arquivo:', error);
      }
    );
  }

  async setorChange() {
    try {
      const ticket = await this.getParamTicket();

      const userInfo = await sessionStorage.getItem('userInfo');
      if (userInfo) {
        var user = JSON.parse(userInfo);
      }

      const novoSetor = await (
        document.getElementById('novo-setor') as HTMLInputElement
      ).value;

      if (novoSetor == null || ticket == null) {
        this.serviceToast.info('Não foi possivel continuar. Tente novamente');
        return;
      }

      this.http
        .patch(`http://localhost:3000/ticket/${ticket}/transferirSetor`, {
          novoSetor: novoSetor,
          userID: user.id,
        })
        .subscribe({
          next: (response: any) => {
            if (response.status != 200) {
              this.serviceToast.error('Não foi possivel fazer a transferência');
              this.togglePopover();
              return;
            }
            this.togglePopover();
            this.serviceToast.success('Setor Transferido');
            this.loadDetalhes();
          },
        });
    } catch (error) {}
  }

  popoverVisible: boolean = false;

  togglePopover() {
    this.popoverVisible = !this.popoverVisible;
  }

  fileName: string | null = null; // Inicializa a variável para armazenar o nome do arquivo

  handleFileUpload(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      const file = input.files[0]; // Obtém o primeiro arquivo selecionado
      this.fileName = file.name; // Armazena o nome do arquivo selecionado
    } else {
      this.fileName = null; // Reseta o nome se nenhum arquivo for selecionado
    }
  }

  async marcarResolvido() {
    const ticket = await this.getParamTicket();
    if (ticket == null) {
      this.serviceToast.info('Não foi possivel criar a nota');
      return;
    }

    const userInfo = await sessionStorage.getItem('userInfo');
    if (userInfo) {
      var user = JSON.parse(userInfo);
    }

    try {
      this.http
        .patch(`http://localhost:3000/ticket/${ticket}/resolvido`, {
          userID: user.id,
        })
        .subscribe({
          next: (response: any) => {
            if (response.status != 200) {
              this.serviceToast.error(
                'Não foi possivel continuar com a solicitação'
              );
              return;
            }
            this.serviceToast.success('Ticket Resolvido');
            setTimeout(() => {
              window.location.reload();
            }, 1500);
          },
        });
    } catch (error) {
      this.serviceToast.error('Não foi possivel se conectar com o servidor');
    }
  }

  async fecharTicket() {
    const ticket = await this.getParamTicket();
    if (ticket == null) {
      this.serviceToast.info('Não foi possivel criar a nota');
      return;
    }

    const userInfo = await sessionStorage.getItem('userInfo');
    if (userInfo) {
      var user = JSON.parse(userInfo);
    }

    try {
      this.http
        .patch(`http://localhost:3000/ticket/${ticket}/fechado`, {
          userID: user.id,
        })
        .subscribe({
          next: (response: any) => {
            if (response.status != 200) {
              this.serviceToast.error(
                'Não foi possivel continuar com a solicitação'
              );
              return;
            }
            this.serviceToast.success('Ticket Fechado');

            setTimeout(() => {
              window.location.reload();
            }, 1500);
          },
        });
    } catch (error) {
      this.serviceToast.error('Não foi possivel se conectar com o servidor');
    }
  }

  scrollToBottom() {
    // Aguarda um pequeno tempo para garantir que as mensagens sejam renderizadas
    const messagesContainer = document.getElementById(
      'mensagens-list'
    ) as HTMLElement;

    if (messagesContainer) {
      messagesContainer.scrollTop = messagesContainer.scrollHeight; // Acessa diretamente o scrollTop e scrollHeight
    }
  }
}

export interface Nota {
  mensagemID: number;
  nome: string;
  data_hora: string;
  mensagem: string;
  anexo: any;
}

export interface Anexo {
  id: number;
  nome_arquivo: string;
  tipo_arquivo: string;
  tamanho: string;
  anexo: any;
}

export interface HistoricoTranferencia {
  dataTransferencia: string;
  setorAntigo: string;
  setorNovo: string;
  user: string;
}
