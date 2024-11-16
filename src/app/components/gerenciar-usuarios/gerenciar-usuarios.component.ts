import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedService } from '../../sharedService';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { lucideRefreshCcw, lucideSearch } from '@ng-icons/lucide';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

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
  tableItems: tabelaUsuario[] = [];
  filteredUsers: tabelaUsuario[] = [];
  filterText = '';
  currentPage = 1;
  usersPerPage = 8;

  constructor(
    private sharedService: SharedService,
    private router: Router,
    private http: HttpClient,
    private toastService: ToastrService
  ) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  async loadUsers() {
    try {
      const userInfo = await sessionStorage.getItem('userInfo');
      if (userInfo) {
        var user = JSON.parse(userInfo);
      }

      this.http.get('http://localhost:3000/users/list', user.id).subscribe({
        next: (response: any) => {
          if (response.status === 200) {
            this.tableItems = response.users.map(
              (user: {
                id: any;
                nome: any;
                email: any;
                celular: any;
                source: any;
                permissao: any;
              }) => ({
                id: user.id,
                nome: user.nome,
                email: user.email,
                telefone: user.celular,
                cargo: user.source,
                tipo: user.permissao,
              })
            );
            this.filteredUsers = [...this.tableItems]; // inicializa a lista filtrada
          } else {
            this.toastService.error(
              'Não foi possível carregar os dados dos usuários'
            );
            console.log(response);
          }
        },
        error: () => {
          this.toastService.error('Erro ao conectar com o servidor');
        },
      });
    } catch (error) {}
  }

  RefreshUsers() {
    this.loadUsers();
  }

  filterUsers() {
    this.filteredUsers = this.tableItems.filter((user) =>
      this.matchesFilter(user)
    );
    this.currentPage = 1;
  }

  private matchesFilter(user: tabelaUsuario): boolean {
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

  deleteUser(id: string) {
    this.sharedService.openModalDelete();
    this.sharedService.setDeleteUserID(id);
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

  editarUser(tipo: string, id: string) {
    console.log(id);
    const tipoValue = tipo.toLowerCase();
    this.sharedService.setEditIdUser(id);
    this.sharedService.setEditTypeUser(tipoValue);
    this.router.navigate(['/home/editar']);
  }
}

interface tabelaUsuario {
  id: string;
  nome: string;
  email: string;
  telefone: string;
  cargo: string; // se você tiver informações sobre cargo, ajuste aqui
  tipo: string;
}
