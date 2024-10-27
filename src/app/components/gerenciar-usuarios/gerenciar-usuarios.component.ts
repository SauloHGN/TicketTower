import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedService } from '../../sharedService';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { lucideRefreshCcw, lucideSearch } from '@ng-icons/lucide';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-gerenciar-usuarios',
  standalone: true,
  imports: [CommonModule, NgIconComponent, FormsModule],
  templateUrl: './gerenciar-usuarios.component.html',
  styleUrl: './gerenciar-usuarios.component.css',
  viewProviders: [
    provideIcons({
      lucideRefreshCcw,
      lucideSearch,
    }),
  ],
})
export class GerenciarUsuariosComponent implements OnInit {
  constructor(private sharedService: SharedService, private router: Router) {
    this.filteredUsers = this.tableItems; // inicializa com todos os usuarios
  }

  tableItems: tabelaUsuario[] = [
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
    {
      nome: 'Amelia Elijah',
      email: 'amelia.elijah@example.com',
      telefone: '+1 (555) 000-000',
      cargo: 'Open source manager',
      tipo: 'Funcionario',
    },
    {
      nome: 'Amelia Elijah',
      email: 'amelia.elijah@example.com',
      telefone: '+1 (555) 000-000',
      cargo: 'Open source manager',
      tipo: 'Funcionario',
    },
    {
      nome: 'Amelia Elijah',
      email: 'amelia.elijah@example.com',
      telefone: '+1 (555) 000-000',
      cargo: 'Open source manager',
      tipo: 'Funcionario',
    },
    {
      nome: 'Amelia Elijah',
      email: 'amelia.elijah@example.com',
      telefone: '+1 (555) 000-000',
      cargo: 'Open source manager',
      tipo: 'Funcionario',
    },
    {
      nome: 'Amelia Elijah',
      email: 'amelia.elijah@example.com',
      telefone: '+1 (555) 000-000',
      cargo: 'Open source manager',
      tipo: 'Funcionario',
    },
    {
      nome: 'Amelia Elijah',
      email: 'amelia.elijah@example.com',
      telefone: '+1 (555) 000-000',
      cargo: 'Open source manager',
      tipo: 'Funcionario',
    },
    {
      nome: 'Amelia Elijah',
      email: 'amelia.elijah@example.com',
      telefone: '+1 (555) 000-000',
      cargo: 'Open source manager',
      tipo: 'Funcionario',
    },
    {
      nome: 'Amelia Elijah',
      email: 'amelia.elijah@example.com',
      telefone: '+1 (555) 000-000',
      cargo: 'Open source manager',
      tipo: 'Funcionario',
    },
    {
      nome: 'Amelia Elijah',
      email: 'amelia.elijah@example.com',
      telefone: '+1 (555) 000-000',
      cargo: 'Open source manager',
      tipo: 'Funcionario',
    },
    {
      nome: 'Amelia Elijah',
      email: 'amelia.elijah@example.com',
      telefone: '+1 (555) 000-000',
      cargo: 'Open source manager',
      tipo: 'Funcionario',
    },
    {
      nome: 'Amelia Elijah',
      email: 'amelia.elijah@example.com',
      telefone: '+1 (555) 000-000',
      cargo: 'Open source manager',
      tipo: 'Funcionario',
    },
    {
      nome: 'Amelia Elijah',
      email: 'amelia.elijah@example.com',
      telefone: '+1 (555) 000-000',
      cargo: 'Open source manager',
      tipo: 'Funcionario',
    },
    {
      nome: 'Amelia Elijah',
      email: 'amelia.elijah@example.com',
      telefone: '+1 (555) 000-000',
      cargo: 'Open source manager',
      tipo: 'Funcionario',
    },
    {
      nome: 'Amelia Elijah',
      email: 'amelia.elijah@example.com',
      telefone: '+1 (555) 000-000',
      cargo: 'Open source manager',
      tipo: 'Funcionario',
    },
    {
      nome: 'Amelia Elijah',
      email: 'amelia.elijah@example.com',
      telefone: '+1 (555) 000-000',
      cargo: 'Open source manager',
      tipo: 'Funcionario',
    },
    {
      nome: 'Amelia Elijah',
      email: 'amelia.elijah@example.com',
      telefone: '+1 (555) 000-000',
      cargo: 'Open source manager',
      tipo: 'Funcionario',
    },
    {
      nome: 'Amelia Elijah',
      email: 'amelia.elijah@example.com',
      telefone: '+1 (555) 000-000',
      cargo: 'Open source manager',
      tipo: 'Funcionario',
    },
    {
      nome: 'Amelia Elijah',
      email: 'amelia.elijah@example.com',
      telefone: '+1 (555) 000-000',
      cargo: 'Open source manager',
      tipo: 'Funcionario',
    },
    {
      nome: 'Amelia Elijah',
      email: 'amelia.elijah@example.com',
      telefone: '+1 (555) 000-000',
      cargo: 'Open source manager',
      tipo: 'Funcionario',
    },
    {
      nome: 'Amelia Elijah',
      email: 'amelia.elijah@example.com',
      telefone: '+1 (555) 000-000',
      cargo: 'Open source manager',
      tipo: 'Funcionario',
    },
    {
      nome: 'Amelia Elijah',
      email: 'amelia.elijah@example.com',
      telefone: '+1 (555) 000-000',
      cargo: 'Open source manager',
      tipo: 'Funcionario',
    },
    {
      nome: 'Amelia Elijah',
      email: 'amelia.elijah@example.com',
      telefone: '+1 (555) 000-000',
      cargo: 'Open source manager',
      tipo: 'Funcionario',
    },
    {
      nome: 'Amelia Elijah',
      email: 'amelia.elijah@example.com',
      telefone: '+1 (555) 000-000',
      cargo: 'Open source manager',
      tipo: 'Funcionario',
    },
    {
      nome: 'Amelia Elijah',
      email: 'amelia.elijah@example.com',
      telefone: '+1 (555) 000-000',
      cargo: 'Open source manager',
      tipo: 'Funcionario',
    },
    {
      nome: 'Amelia Elijah',
      email: 'amelia.elijah@example.com',
      telefone: '+1 (555) 000-000',
      cargo: 'Open source manager',
      tipo: 'Funcionario',
    },
    {
      nome: 'Amelia Elijah',
      email: 'amelia.elijah@example.com',
      telefone: '+1 (555) 000-000',
      cargo: 'Open source manager',
      tipo: 'Funcionario',
    },
    {
      nome: 'Amelia Elijah',
      email: 'amelia.elijah@example.com',
      telefone: '+1 (555) 000-000',
      cargo: 'Open source manager',
      tipo: 'Funcionario',
    },
    {
      nome: 'Amelia Elijah',
      email: 'amelia.elijah@example.com',
      telefone: '+1 (555) 000-000',
      cargo: 'Open source manager',
      tipo: 'Funcionario',
    },
    {
      nome: 'Amelia Elijah',
      email: 'amelia.elijah@example.com',
      telefone: '+1 (555) 000-000',
      cargo: 'Open source manager',
      tipo: 'Funcionario',
    },
    {
      nome: 'Amelia Elijah',
      email: 'amelia.elijah@example.com',
      telefone: '+1 (555) 000-000',
      cargo: 'Open source manager',
      tipo: 'Funcionario',
    },
    {
      nome: 'Amelia Elijah',
      email: 'amelia.elijah@example.com',
      telefone: '+1 (555) 000-000',
      cargo: 'Open source manager',
      tipo: 'Funcionario',
    },
    {
      nome: 'Amelia Elijah',
      email: 'amelia.elijah@example.com',
      telefone: '+1 (555) 000-000',
      cargo: 'Open source manager',
      tipo: 'Funcionario',
    },
    {
      nome: 'Amelia Elijah',
      email: 'amelia.elijah@example.com',
      telefone: '+1 (555) 000-000',
      cargo: 'Open source manager',
      tipo: 'Funcionario',
    },
    {
      nome: 'Amelia Elijah',
      email: 'amelia.elijah@example.com',
      telefone: '+1 (555) 000-000',
      cargo: 'Open source manager',
      tipo: 'Funcionario',
    },
    {
      nome: 'Amelia Elijah',
      email: 'amelia.elijah@example.com',
      telefone: '+1 (555) 000-000',
      cargo: 'Open source manager',
      tipo: 'Funcionario',
    },
    {
      nome: 'Amelia Elijah',
      email: 'amelia.elijah@example.com',
      telefone: '+1 (555) 000-000',
      cargo: 'Open source manager',
      tipo: 'Funcionario',
    },
    {
      nome: 'Amelia Elijah',
      email: 'amelia.elijah@example.com',
      telefone: '+1 (555) 000-000',
      cargo: 'Open source manager',
      tipo: 'Funcionario',
    },
    {
      nome: 'Amelia Elijah',
      email: 'amelia.elijah@example.com',
      telefone: '+1 (555) 000-000',
      cargo: 'Open source manager',
      tipo: 'Funcionario',
    },
    {
      nome: 'Amelia Elijah',
      email: 'amelia.elijah@example.com',
      telefone: '+1 (555) 000-000',
      cargo: 'Open source manager',
      tipo: 'Funcionario',
    },
    {
      nome: 'Amelia Elijah',
      email: 'amelia.elijah@example.com',
      telefone: '+1 (555) 000-000',
      cargo: 'Open source manager',
      tipo: 'Funcionario',
    },
    {
      nome: 'Amelia Elijah',
      email: 'amelia.elijah@example.com',
      telefone: '+1 (555) 000-000',
      cargo: 'Open source manager',
      tipo: 'Funcionario',
    },
    {
      nome: 'Amelia Elijah',
      email: 'amelia.elijah@example.com',
      telefone: '+1 (555) 000-000',
      cargo: 'Open source manager',
      tipo: 'Funcionario',
    },
    {
      nome: 'Amelia Elijah',
      email: 'amelia.elijah@example.com',
      telefone: '+1 (555) 000-000',
      cargo: 'Open source manager',
      tipo: 'Funcionario',
    },
    {
      nome: 'Amelia Elijah',
      email: 'amelia.elijah@example.com',
      telefone: '+1 (555) 000-000',
      cargo: 'Open source manager',
      tipo: 'Funcionario',
    },
    {
      nome: 'Amelia Elijah',
      email: 'amelia.elijah@example.com',
      telefone: '+1 (555) 000-000',
      cargo: 'Open source manager',
      tipo: 'Funcionario',
    },
    {
      nome: 'Amelia Elijah',
      email: 'amelia.elijah@example.com',
      telefone: '+1 (555) 000-000',
      cargo: 'Open source manager',
      tipo: 'Funcionario',
    },
    {
      nome: 'Amelia Elijah',
      email: 'amelia.elijah@example.com',
      telefone: '+1 (555) 000-000',
      cargo: 'Open source manager',
      tipo: 'Funcionario',
    },
    {
      nome: 'Amelia Elijah',
      email: 'amelia.elijah@example.com',
      telefone: '+1 (555) 000-000',
      cargo: 'Open source manager',
      tipo: 'Funcionario',
    },
    {
      nome: 'Amelia Elijah',
      email: 'amelia.elijah@example.com',
      telefone: '+1 (555) 000-000',
      cargo: 'Open source manager',
      tipo: 'Funcionario',
    },
    {
      nome: 'Amelia Elijah',
      email: 'amelia.elijah@example.com',
      telefone: '+1 (555) 000-000',
      cargo: 'Open source manager',
      tipo: 'Funcionario',
    },
    {
      nome: 'Amelia Elijah',
      email: 'amelia.elijah@example.com',
      telefone: '+1 (555) 000-000',
      cargo: 'Open source manager',
      tipo: 'Funcionario',
    },
    {
      nome: 'Amelia Elijah',
      email: 'amelia.elijah@example.com',
      telefone: '+1 (555) 000-000',
      cargo: 'Open source manager',
      tipo: 'Funcionario',
    },
    {
      nome: 'Amelia Elijah',
      email: 'amelia.elijah@example.com',
      telefone: '+1 (555) 000-000',
      cargo: 'Open source manager',
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

  ngOnInit(): void {}

  deleteUser() {
    this.sharedService.openModalDelete();
  }

  filteredUsers: tabelaUsuario[] = []; // Esta será a lista filtrada
  filterText = ''; // valor do filtro (input)
  currentPage = 1; // pagina atual
  usersPerPage = 8; // quantidade de usuarios por página

  filterUsers() {
    this.filteredUsers = this.tableItems.filter((tabelaUsuario) =>
      this.matchesFilter(tabelaUsuario)
    );
    this.currentPage = 1; // resetar para a primeira pagina
  }

  private matchesFilter(user: tabelaUsuario): boolean {
    // filtar dados da tabela de acordo com os atributos definidos
    const lowerCaseFilterText = this.filterText.toLowerCase();
    return (
      user.nome.toLowerCase().includes(lowerCaseFilterText) ||
      user.email.toLowerCase().includes(lowerCaseFilterText) ||
      user.telefone.toLowerCase().includes(lowerCaseFilterText) ||
      user.cargo.toLowerCase().includes(lowerCaseFilterText) ||
      user.tipo.toLowerCase().includes(lowerCaseFilterText)
    );
  }

  get paginatedUsers() {
    const startIndex = (this.currentPage - 1) * this.usersPerPage;
    return this.filteredUsers.slice(startIndex, startIndex + this.usersPerPage);
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
    return Math.ceil(this.filteredUsers.length / this.usersPerPage);
  }

  editarUser(tipo: string) {
    const tipoValue = tipo.toLowerCase();

    this.sharedService.setEditTypeUser(tipoValue);

    this.router.navigate(['/home/editar']);
  }
}

interface tabelaUsuario {
  nome: string;
  email: string;
  telefone: string;
  cargo: string;
  tipo: string;
}
