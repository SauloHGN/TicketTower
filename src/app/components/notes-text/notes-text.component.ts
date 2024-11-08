import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-notes-text',
  standalone: true,
  imports: [],
  templateUrl: './notes-text.component.html',
  styleUrl: './notes-text.component.css'
})
export class NotesTextComponent {
  @Input() nome!: string;
  @Input() data_hora!: string;
  @Input() mensagem!: string;
}
