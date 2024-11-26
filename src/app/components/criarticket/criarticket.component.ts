import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Prioridade } from '../../enum/prioridade';
import { lucideBox } from '@ng-icons/lucide';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { ToastrService } from 'ngx-toastr';
import { ticketClassify } from '../../enum/ticketClassify';
import { tick } from '@angular/core/testing';

@Component({
  selector: 'app-criarticket',
  standalone: true,
  templateUrl: './criarticket.component.html',
  styleUrl: './criarticket.component.css',
  viewProviders: [
    provideIcons({
      lucideBox,
    }),
  ],
  imports: [CommonModule, NgIconComponent],
})
export class CriarTicketComponent implements OnInit {
  setores?: any[];
  selectedSetor: any;

  valorPrioridade: any = Prioridade; // Propriedade para armazenar o valor selecionado
  enumValues = Object.values(Prioridade); // Array com os valores do enum
  enum = Prioridade;

  ticketClassify?: any[];
  selectedTicketClassify: any;
  valorClassify: any = ticketClassify;
  enumTicketClassify = Object.values(ticketClassify);
  enumTicket = ticketClassify;

  constructor(private http: HttpClient, private toastService: ToastrService) {}

  ngOnInit(): void {
    try {
      // ------- Captar todos os setores ---------
      this.http
        .get<any[]>('http://localhost:3000/setores')
        .subscribe((data) => {
          this.setores = data;
        });
    } catch {
      this.toastService.error('Erro ao se comunicar com o servidor');
    }
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

  arquivosValidos = [
    'jpg',
    'jpeg',
    'png',
    'webp',
    'csv',
    'xls',
    'xlsx',
    'pdf',
    'doc',
    'docx',
    'txt',
    'zip',
    'tar',
    'gz',
    'json',
    'xml',
  ];

  validarArquivo(file: any) {
    const fileExtension = file.name.split('.').pop().toLowerCase();
    return this.arquivosValidos.includes(fileExtension);
  }

  criarTicket() {
    const url = 'http://localhost:3000/ticket/criar';

    try {
      let userID = '';
      const userInfoString = sessionStorage.getItem('userInfo');
      if (userInfoString) {
        const userInfo = JSON.parse(userInfoString);
        userID = userInfo.id;
      } else {
        this.toastService.error('não foi possivel efetuar a criação');
        return;
      }

      const ticket: ticket = {
        userID: userID,
        titulo: (document.getElementById('titulo') as HTMLInputElement).value,
        descricao: (document.getElementById('descricao') as HTMLInputElement)
          .value,
        setor: (document.getElementById('setor') as HTMLInputElement).value,
        prioridade: (document.getElementById('prioridade') as HTMLInputElement)
          .value as Prioridade,
        classificacao: (
          document.getElementById('classificacao') as HTMLInputElement
        ).value as ticketClassify,
        files: Array.from(
          (document.getElementById('file') as HTMLInputElement).files || [],
          (file) => file as File
        ), // Converte uma FileList para Array de files
      };

      console.log(ticket);

      if (
        !ticket.titulo ||
        !ticket.descricao ||
        !ticket.setor ||
        !ticket.prioridade
      ) {
        this.toastService.info(
          'É necessário preencher todos os campos antes de continuar.'
        );
        return;
      }

      this.http.post(url, ticket).subscribe((response: any) => {
        if (response.status != 201) {
          this.toastService.error('Erro ao criar Ticket');
          return;
        }
        this.toastService.success('Ticket criado com sucesso.');

        //limpar campos

        (document.getElementById('titulo') as HTMLInputElement).value = '';
        (document.getElementById('descricao') as HTMLInputElement).value = '';

        const selectElements = document.querySelectorAll('select');

        selectElements.forEach((select) => {
          select.selectedIndex = 0;
        });
      });
      //console.log(ticket);
    } catch (error) {
      this.toastService.error(
        'Erro inesperado... \nNão foi possivel criar o ticket'
      );
    }
  }
}

export interface ticket {
  userID: string;
  titulo: string;
  descricao: string;
  setor: string;
  prioridade: Prioridade;
  classificacao: ticketClassify;
  files: File[];
}
