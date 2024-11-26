import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { FormsModule } from '@angular/forms';
import {
  lucideBarcode,
  lucideBuilding,
  lucideBus,
  lucideGripHorizontal,
  lucideLocate,
  lucideMail,
  lucideMapPinned,
  lucidePenLine,
  lucidePhone,
  lucideQrCode,
  lucideUserRound,
} from '@ng-icons/lucide';
import { SharedService } from '../../sharedService';
import { Permissao } from '../../enum/permissao';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-user',
  standalone: true,
  imports: [CommonModule, NgIconComponent, FormsModule],
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.css',

  viewProviders: [
    provideIcons({
      lucideBuilding,
      lucideMail,
      lucideQrCode,
      lucideMapPinned,
      lucideGripHorizontal,
      lucideLocate,
      lucideBus,
      lucideBarcode,
      lucidePhone,
      lucideUserRound,
      lucidePenLine,
    }),
  ],
})
export class EditUserComponent implements OnInit {
  tipoUsuario = '';
  setores?: any[];
  selectedSetor: any;

  empresas?: any[];
  selectedEmpresa: any;

  valorPermissao: any = Permissao; // Propriedade para armazenar o valor selecionado
  enumValues = Object.values(Permissao); // Array com os valores do enum
  enum = Permissao;

  empresaSelecionada: any = '';
  setorSelecionado: any = '';
  permissaoSelecionada: any = '';

  constructor(
    private http: HttpClient,
    private sharedService: SharedService,
    private router: Router,
    private toastService: ToastrService
  ) {}

  async ngOnInit() {
    sessionStorage.setItem('pageLoaded', 'false');

    if (!sessionStorage.getItem('pageLoaded')) {
      // Marca que a página foi carregada
      sessionStorage.setItem('pageLoaded', 'true');

      this.router.navigate(['/home/gerenciar-usuarios']);
    } else {
      sessionStorage.removeItem('pageLoaded');
    }

    this.tipoUsuario = this.sharedService.getEditTypeUser();

    this.http.get<any[]>('http://localhost:3000/setores').subscribe((data) => {
      this.setores = data;
    });

    this.http.get<any[]>('http://localhost:3000/empresas').subscribe((data) => {
      this.empresas = data;
    });

    const currentUser = await this.sharedService.getEditIdUser();

    let userID = '';
    const userInfoString = await sessionStorage.getItem('userInfo');
    if (userInfoString) {
      const userInfo = JSON.parse(userInfoString);
      userID = userInfo.id;
    }

    this.http
      .get<any>(`http://localhost:3000/users/listById/${userID}/${currentUser}`)
      .subscribe((data) => {
        if (this.tipoUsuario === 'cliente') {
          // Preenche os dados do cliente
          if (data && data.users) {
            document
              .getElementById('cliente-nome')
              ?.setAttribute('value', data.users.nome);
            document
              .getElementById('cliente-email')
              ?.setAttribute('value', data.users.email);
            document
              .getElementById('cliente-celular')
              ?.setAttribute('value', data.users.celular);

            this.empresaSelecionada = data.users.empresa;
          }
        } else {
          // Preenche os dados do funcionário
          if (data && data.users) {
            document
              .getElementById('funcionario-nome')
              ?.setAttribute('value', data.users.nome);
            document
              .getElementById('funcionario-email')
              ?.setAttribute('value', data.users.email);
            document
              .getElementById('funcionario-celular')
              ?.setAttribute('value', data.users.celular);
            document
              .getElementById('funcionario-cargo')
              ?.setAttribute('value', data.users.source); // Acessando direto o campo 'source' (cargo)

            this.setorSelecionado = data.users.setor;
            this.permissaoSelecionada = data.users.permissao;
          }
        }
      });
  }

  updateUser(tipoUsuario: string) {
    let alterData: any = '';

    if (this.tipoUsuario === 'cliente') {
      alterData = {
        nome: (document.getElementById('cliente-nome') as HTMLInputElement)
          ?.value,
        email: (document.getElementById('cliente-email') as HTMLInputElement)
          ?.value,
        celular: (
          document.getElementById('cliente-celular') as HTMLInputElement
        )?.value,
        empresa: this.empresaSelecionada,
      };
    } else {
      alterData = {
        nome: (document.getElementById('funcionario-nome') as HTMLInputElement)
          ?.value,
        email: (
          document.getElementById('funcionario-email') as HTMLInputElement
        )?.value,
        celular: (
          document.getElementById('funcionario-celular') as HTMLInputElement
        )?.value,
        cargo: (
          document.getElementById('funcionario-cargo') as HTMLInputElement
        )?.value,
        setor: (
          document.getElementById('funcionario-setor') as HTMLSelectElement
        )?.value, // Afirmando que é um Select
      };

      window.location.reload();
    }

    let userID = '';
    const userInfoString = sessionStorage.getItem('userInfo');
    if (userInfoString) {
      const userInfo = JSON.parse(userInfoString);
      userID = userInfo.id;
    }
    const currentUser = this.sharedService.getEditIdUser();

    this.http
      .put(`http://localhost:3000/users/${userID}/${currentUser}`, alterData)
      .subscribe(
        (response) => {
          this.toastService.success('Usuário atualizado com sucesso:');
        },
        (error) => {
          this.toastService.error('Erro ao atualizar o usuário:');
        }
      );
  }
}

export interface dadosCliente {
  id: string;
  nome: string;
  email: string;
  permissao: string;
  celular: string;
  empresa: number;
}

export interface dadosFuncionario {
  id: string;
  nome: string;
  email: string;
  permissao: string;
  celular: string;
  cargo: string;
  setor: number;
}
