import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Prioridade } from '../../enum/prioridade';

@Component({
  selector: 'app-criarticket',
  standalone: true,
  templateUrl: './criarticket.component.html',
  styleUrl: './criarticket.component.css',
  imports: [CommonModule],
})
export class CriarTicketComponent implements OnInit {
  setores?: any[];
  selectedSetor: any;

  valorPrioridade: any = Prioridade; // Propriedade para armazenar o valor selecionado
  enumValues = Object.values(Prioridade); // Array com os valores do enum
  enum = Prioridade;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    try {
      this.http
        .get<any[]>('http://localhost:3000/setores')
        .subscribe((data) => {
          this.setores = data;
        });
    } catch {
      throw new Error('Erro ao se comunicar com o servidor');
    }
  }
}
