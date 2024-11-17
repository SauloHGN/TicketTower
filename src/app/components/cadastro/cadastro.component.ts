import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgxMaskDirective } from 'ngx-mask';
import { Permissao } from '../../enum/permissao';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import {
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
} from '@ng-icons/lucide';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [FormsModule, CommonModule, NgxMaskDirective, NgIconComponent],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.css',
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
export class CadastroComponent implements OnInit {
  constructor(private http: HttpClient, private toastService: ToastrService) {}

  selectedType: string = ''; // Atributo que armazena o tipo selecionado

  options = [
    { type: 'cliente' },
    { type: 'empresa' },
    { type: 'funcionario' },
    { type: 'setor' },
  ];

  estados = [
    'Acre',
    'Alagoas',
    'Amapá',
    'Amazonas',
    'Bahia',
    'Ceará',
    'Distrito Federal',
    'Espírito Santo',
    'Goiás',
    'Maranhão',
    'Mato Grosso',
    'Mato Grosso do Sul',
    'Minas Gerais',
    'Pará',
    'Paraíba',
    'Paraná',
    'Pernambuco',
    'Piauí',
    'Rio de Janeiro',
    'Rio Grande do Norte',
    'Rio Grande do Sul',
    'Rondônia',
    'Roraima',
    'Santa Catarina',
    'São Paulo',
    'Sergipe',
    'Tocantins',
  ];

  selectOption(option: any) {
    this.selectedType = option;
  }

  // Métodos para verificar qual formulário deve ser mostrado com base no tipo selecionado
  showEmpresaForm(): boolean {
    return this.selectedType === 'empresa';
  }

  showClienteForm(): boolean {
    return this.selectedType === 'cliente';
  }

  showSetorForm(): boolean {
    return this.selectedType === 'setor';
  }

  showFuncionarioForm(): boolean {
    return this.selectedType === 'funcionario';
  }

  valorPermissao: any = Permissao; // Propriedade para armazenar o valor selecionado
  enumValues = Object.values(Permissao); // Array com os valores do enum
  enum = Permissao;

  //----  DADOS COMBO BOX ------//
  setores?: any[];
  selectedSetor: any;

  empresas?: any[];
  selectedEmpresa: any;

  ngOnInit(): void {
    this.http.get<any[]>('http://localhost:3000/setores').subscribe((data) => {
      this.setores = data;
    });

    this.http.get<any[]>('http://localhost:3000/empresas').subscribe((data) => {
      this.empresas = data;
    });
  }

  //----- Cadastro -----//
  isProcessing = false;

  Cadastro() {
    if (this.isProcessing) {
      return;
    }

    this.isProcessing = true;

    if (this.selectedType === 'empresa') {
      this.CadastrarEmpresa();
    }
    if (this.selectedType === 'cliente') {
      this.CadastrarCliente();
    }
    if (this.selectedType === 'setor') {
      this.CadastrarSetor();
    }
    if (this.selectedType === 'funcionario') {
      this.CadastrarFuncionario();
    }

    setTimeout(() => {
      window.location.reload();
    }, 1000);

    setTimeout(() => {
      this.isProcessing = false;
    }, 1500);
  }

  CadastrarEmpresa() {
    try {
      const enderecoData = {
        cidade: (document.getElementById('empresa-cidade') as HTMLInputElement)
          .value,
        numero: (document.getElementById('empresa-numero') as HTMLInputElement)
          .value,
        bairro: (document.getElementById('empresa-bairro') as HTMLInputElement)
          .value,
        cep: (document.getElementById('empresa-cep') as HTMLInputElement).value,
        rua: (document.getElementById('empresa-rua') as HTMLInputElement).value,
        estado: (document.getElementById('empresa-estado') as HTMLInputElement)
          .value,
      };
      this.http
        .post('http://localhost:3000/cadastro/endereco', enderecoData)
        .subscribe((response: any) => {
          console.log(response); //Excluir
          const idEndereco = response.id;

          const empresaData = {
            nome: (document.getElementById('empresa-nome') as HTMLInputElement)
              .value,
            cnpj: (document.getElementById('empresa-cnpj') as HTMLInputElement)
              .value,
            id_endereco: idEndereco,
          };
          this.http
            .post('http://localhost:3000/cadastro/empresa', empresaData)
            .subscribe((response) => {
              console.log(response); //Excluir
              this.toastService.success('Empresa Cadastrada com sucesso');

              (
                document.getElementById('empresa-nome') as HTMLInputElement
              ).value = '';
              (
                document.getElementById('empresa-cnpj') as HTMLInputElement
              ).value = '';
              (
                document.getElementById('empresa-cidade') as HTMLInputElement
              ).value = '';
              (
                document.getElementById('empresa-numero') as HTMLInputElement
              ).value = '';
              (
                document.getElementById('empresa-bairro') as HTMLInputElement
              ).value = '';
              (
                document.getElementById('empresa-cep') as HTMLInputElement
              ).value = '';
              (
                document.getElementById('empresa-rua') as HTMLInputElement
              ).value = '';
              (
                document.getElementById('empresa-estado') as HTMLInputElement
              ).value = '';
            });
        });
    } catch (error) {
      this.toastService.error('Ops, Erro no cadastro');
    }
  }

  async CadastrarCliente() {
    try {
      const userInfo = sessionStorage.getItem('userInfo');
      if (userInfo) {
        var user = JSON.parse(userInfo);
      }

      let clienteData: any = {
        nome: (document.getElementById('cliente-nome') as HTMLInputElement)
          .value,
        email: (document.getElementById('cliente-email') as HTMLInputElement)
          .value,
        celular: (
          document.getElementById('cliente-celular') as HTMLInputElement
        ).value,
        id_empresa: (
          document.getElementById('cliente-empresa') as HTMLInputElement
        ).value,
      };

      console.log(clienteData);

      this.http
        .post(`http://localhost:3000/cadastro/${user.id}/cliente`, clienteData)
        .subscribe((response) => {
          //console.log(response); //Excluir

          this.toastService.success('Cliente cadastrado com sucesso');
          // Limpar os campos após o cadastro
          (document.getElementById('cliente-nome') as HTMLInputElement).value =
            '';
          (document.getElementById('cliente-email') as HTMLInputElement).value =
            '';
          (
            document.getElementById('cliente-celular') as HTMLInputElement
          ).value = '';
          (
            document.getElementById('cliente-empresa') as HTMLInputElement
          ).value = '';
        });
    } catch (error) {
      this.toastService.error('Erro ao cadastrar cliente');
    }
  }

  CadastrarSetor() {
    try {
      const setorData = {
        nome: (document.getElementById('setor-nome') as HTMLInputElement).value,
      };
      this.http
        .post(`http://localhost:3000/cadastro/setor`, setorData)
        .subscribe((response) => {
          console.log(response); //Excluir

          // Limpar os campos após o cadastro
          this.toastService.success('Setor cadastrado com sucesso');
          (document.getElementById('setor-nome') as HTMLInputElement).value =
            '';
        });
    } catch (error) {
      this.toastService.error('Erro ao cadastrar setor');
    }
  }

  CadastrarFuncionario() {
    try {
      const userInfo = sessionStorage.getItem('userInfo');
      if (userInfo) {
        var user = JSON.parse(userInfo);
      }

      console.log(user.id);

      let funcionarioData = {
        nome: this.getElementValue('funcionario-nome'),
        email: this.getElementValue('funcionario-email'),
        permissao: this.getElementValue('funcionario-permissao'),
        celular: this.getElementValue('funcionario-celular'),
        id_setor: this.getElementValue('funcionario-setor'),
        cargo: this.getElementValue('funcionario-cargo'),
      };

      this.http
        .post(
          `http://localhost:3000/cadastro/${user.id}/funcionario`,
          funcionarioData
        )
        .subscribe({
          next: (response) => {
            console.log(response); // Excluir se não for necessário
            this.toastService.success('Funcionario cadastrado com sucesso');
            (
              document.getElementById('funcionario-nome') as HTMLInputElement
            ).value = '';

            (
              document.getElementById('funcionario-email') as HTMLInputElement
            ).value = '';

            (
              document.getElementById(
                'funcionario-permissao'
              ) as HTMLInputElement
            ).value = '';

            (
              document.getElementById('funcionario-celular') as HTMLInputElement
            ).value = '';

            (
              document.getElementById('funcionario-setor') as HTMLInputElement
            ).value = '';

            (
              document.getElementById('funcionario-cargo') as HTMLInputElement
            ).value = '';
            this.limparCamposFuncionario();
          },
          error: (error) => {
            console.error(error);
            this.toastService.error('Erro ao cadastrar funcionario');
          },
        });
    } catch (error) {
      this.toastService.error('Erro ao cadastrar funcionario');
    }
  }

  getElementValue(id: string): string {
    const element = document.getElementById(id) as HTMLInputElement;
    if (element) {
      return element.value;
    }
    console.error(`Elemento com id "${id}" não encontrado`);
    return ''; // ou você pode lançar um erro se preferir
  }

  limparCamposFuncionario() {
    document.getElementById('funcionario-nome')?.setAttribute('value', '');
    document.getElementById('funcionario-email')?.setAttribute('value', '');
    document.getElementById('funcionario-permissao')?.setAttribute('value', '');
    document.getElementById('funcionario-celular')?.setAttribute('value', '');
    document.getElementById('funcionario-setor')?.setAttribute('value', '');
  }

  async buscarIdEmpresaPorNome(nomeEmpresa: string) {
    try {
      this.http
        .get(`http://localhost:3000/cadastro/nomeEmpresa/${nomeEmpresa}`)
        .subscribe({
          next: (response) => {
            return response;
          },
        });
    } catch (error) {
      return 'Erro ao buscar empresa por nome';
    }
    return null;
  }
}
