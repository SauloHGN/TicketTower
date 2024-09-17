import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-gerenciar-usuarios',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './gerenciar-usuarios.component.html',
  styleUrl: './gerenciar-usuarios.component.css',
})
export class GerenciarUsuariosComponent implements OnInit {
  tableItems = [
    {
      nome: 'Liam James',
      email: 'liamjames@example.com',
      telefone: '+1 (555) 000-000',
      cargo: 'Software engineer',
      tipo: 'Cliente',
    },
    {
      nome: 'Olivia Emma',
      email: 'oliviaemma@example.com',
      telefone: '+1 (555) 000-000',
      cargo: 'Product designer',
      tipo: 'Cliente',
    },
    {
      nome: 'William Benjamin',
      email: 'william.benjamin@example.com',
      telefone: '+1 (555) 000-000',
      cargo: 'Front-end developer',
      tipo: 'Funcionario',
    },
    {
      nome: 'Henry Theodore',
      email: 'henrytheodore@example.com',
      telefone: '+1 (555) 000-000',
      cargo: 'Laravel engineer',
      tipo: 'Funcionario',
    },
    {
      nome: 'Amelia Elijah',
      email: 'amelia.elijah@example.com',
      telefone: '+1 (555) 000-000',
      cargo: 'Open source manager',
      tipo: 'Funcionario',
    },
  ];

  constructor() {}

  ngOnInit(): void {}
}
