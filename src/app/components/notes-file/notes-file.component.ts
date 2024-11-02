import { Component, Input } from '@angular/core';
import { TicketComponent } from '../ticket/ticket.component';

@Component({
  selector: 'app-notes-file',
  standalone: true,
  imports: [],
  templateUrl: './notes-file.component.html',
  styleUrl: './notes-file.component.css',
})
export class NotesFileComponent {
  @Input() id!: number;
  @Input() nome!: string;
  @Input() data_hora!: string;
  @Input() mensagem!: string;
  @Input() nome_arquivo!: string;
  @Input() tipo_arquivo!: string;
  @Input() tamanho!: string;

  constructor(private ticketComponent: TicketComponent) {}

  downloadFile(id: number, nome_arquivo: string) {
    this.ticketComponent.downloadAnexo(id, nome_arquivo);
  }
}
