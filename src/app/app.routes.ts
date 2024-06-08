import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './components/pages/landing/landing.component';
import { LoginComponent } from './components/pages/login/login.component';
import { HomeComponent } from './components/pages/admin/home/home.component';
import { HomeClienteComponent } from './components/pages/cliente/home-cliente/home-cliente.component';
import { HomeFuncionarioComponent } from './components/pages/funcionario/home-funcionario/home-funcionario.component';
import { TarefasComponent } from './components/tarefas/tarefas.component';
import { ConfiguracaoComponent } from './components/configuracao/configuracao.component';
import { CriarTicketComponent } from './components/criarticket/criarticket.component';

import { NgModule } from '@angular/core';
import { CadastroComponent } from './components/cadastro/cadastro.component';

export const routes: Routes = [
  { path: '', title: 'Ticket Tower', component: LandingComponent },
  { path: 'login', title: 'Entrar', component: LoginComponent },
  {
    path: 'home',
    title: 'Página Inicial',
    component: HomeComponent,

    children: [
      {
        path: 'tarefas',
        title: 'Fila de Tickets',
        component: TarefasComponent,
        outlet: 'secundary',
      },

      {
        path: 'cadastro',
        title: 'Cadastro',
        component: CadastroComponent,
        outlet: 'secundary',
      },

      {
        path: 'CriarTicket',
        title: 'Criar Ticket',
        component: CriarTicketComponent,
        outlet: 'secundary',
      },

      {
        path: 'configuracoes',
        title: 'Configurações',
        component: ConfiguracaoComponent,
        outlet: 'secundary',
      },
    ],
  },

  {
    path: 'homeCliente',
    title: 'Página Inicial',
    component: HomeClienteComponent,

    children: [
      {
        path: 'tarefas',
        title: 'Fila de Tickets',
        component: TarefasComponent,
        outlet: 'secundary',
      },

      {
        path: 'configuracoes',
        title: 'Configurações',
        component: ConfiguracaoComponent,
        outlet: 'secundary',
      },
    ],
  },

  {
    path: 'homeFuncionario',
    title: 'Página Inicial',
    component: HomeFuncionarioComponent,

    children: [
      {
        path: 'tarefas',
        title: 'Fila de Tickets',
        component: TarefasComponent,
        outlet: 'secundary',
      },

      {
        path: 'configuracoes',
        title: 'Configurações',
        component: ConfiguracaoComponent,
        outlet: 'secundary',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutes {}
