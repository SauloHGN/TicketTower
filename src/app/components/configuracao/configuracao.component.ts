import { Component, OnInit } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { lucidePencilLine } from '@ng-icons/lucide';
import { FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-configuracao',
  standalone: true,
  templateUrl: './configuracao.component.html',
  styleUrl: './configuracao.component.css',
  imports: [NgIconComponent],
  viewProviders: [
    provideIcons({
      lucidePencilLine,
    }),
  ],
})
export class ConfiguracaoComponent implements OnInit {
  isDisable = true;

  constructor(
    private http: HttpClient,
    private toastService: ToastrService,
    private themeService: ThemeService
  ) {}

  switchDisable() {
    this.isDisable = !this.isDisable;
    if (!this.isDisable) {
      const inputs = document.querySelectorAll('input:disabled');
      inputs.forEach((input) => {
        input.removeAttribute('disabled');
      });
    }
  }

  salvarSLA() {
    try {
      if (this.isDisable) {
        this.toastService.info(
          'É necessário preencher todos os dados antes de continuar'
        );
        return;
      }

      const userInfo = sessionStorage.getItem('userInfo');
      if (userInfo) {
        var user = JSON.parse(userInfo);
      }

      let dadosSLA = {
        userID: user.id,
        incidente: {
          resolucao: {
            urgente: (
              document.getElementById(
                'resolucao-incidente-urgente'
              ) as HTMLInputElement
            ).value,
            alta: (
              document.getElementById(
                'resolucao-incidente-alta'
              ) as HTMLInputElement
            ).value,
            média: (
              document.getElementById(
                'resolucao-incidente-media'
              ) as HTMLInputElement
            ).value,
            normal: (
              document.getElementById(
                'resolucao-incidente-normal'
              ) as HTMLInputElement
            ).value,
          },
          resposta: {
            urgente: (
              document.getElementById(
                'resposta-incidente-urgente'
              ) as HTMLInputElement
            ).value,
            alta: (
              document.getElementById(
                'resposta-incidente-alta'
              ) as HTMLInputElement
            ).value,
            média: (
              document.getElementById(
                'resposta-incidente-media'
              ) as HTMLInputElement
            ).value,
            normal: (
              document.getElementById(
                'resposta-incidente-normal'
              ) as HTMLInputElement
            ).value,
          },
        },
        mudanca: {
          resolucao: {
            urgente: (
              document.getElementById(
                'resolucao-mudanca-urgente'
              ) as HTMLInputElement
            ).value,
            alta: (
              document.getElementById(
                'resolucao-mudanca-alta'
              ) as HTMLInputElement
            ).value,
            média: (
              document.getElementById(
                'resolucao-mudanca-media'
              ) as HTMLInputElement
            ).value,
            normal: (
              document.getElementById(
                'resolucao-mudanca-normal'
              ) as HTMLInputElement
            ).value,
          },
          resposta: {
            urgente: (
              document.getElementById(
                'resposta-mudanca-urgente'
              ) as HTMLInputElement
            ).value,
            alta: (
              document.getElementById(
                'resposta-mudanca-alta'
              ) as HTMLInputElement
            ).value,
            média: (
              document.getElementById(
                'resposta-mudanca-media'
              ) as HTMLInputElement
            ).value,
            normal: (
              document.getElementById(
                'resposta-mudanca-normal'
              ) as HTMLInputElement
            ).value,
          },
        },
        solicitacao_de_servico: {
          resolucao: {
            urgente: (
              document.getElementById(
                'resolucao-solicitacao-servico-urgente'
              ) as HTMLInputElement
            ).value,
            alta: (
              document.getElementById(
                'resolucao-solicitacao-servico-alta'
              ) as HTMLInputElement
            ).value,
            média: (
              document.getElementById(
                'resolucao-solicitacao-servico-media'
              ) as HTMLInputElement
            ).value,
            normal: (
              document.getElementById(
                'resolucao-solicitacao-servico-normal'
              ) as HTMLInputElement
            ).value,
          },
          resposta: {
            urgente: (
              document.getElementById(
                'resposta-solicitacao-servico-urgente'
              ) as HTMLInputElement
            ).value,
            alta: (
              document.getElementById(
                'resposta-solicitacao-servico-alta'
              ) as HTMLInputElement
            ).value,
            média: (
              document.getElementById(
                'resposta-solicitacao-servico-media'
              ) as HTMLInputElement
            ).value,
            normal: (
              document.getElementById(
                'resposta-solicitacao-servico-normal'
              ) as HTMLInputElement
            ).value,
          },
        },
      };

      console.log(dadosSLA);

      this.http
        .post(`http://localhost:3000/sla`, dadosSLA)
        .subscribe((response: any) => {
          //console.log(response); //Excluir
          if (response.status && response.status !== 200) {
            this.toastService.error('Erro ao atualizar dados de SLA.');
          }
          this.toastService.success('Dados de SLA atualizados com sucesso.');
        });
    } catch (error) {
      console.log(error);
      this.toastService.error(
        'OPs. Não foi possivel enviar os dados... \n Tente novamente!'
      );
    }
  }

  theme: boolean = false;

  ngOnInit(): void {
    this.theme = localStorage.getItem('lightTheme') === 'true';
  }

  switchColorTheme(event: any): void {
    const isChecked = event.target.checked;

    if (this.theme !== isChecked) {
      this.theme = isChecked;
      this.themeService.switchTheme(); // Serviço global para alterar thema
    }
  }
}
