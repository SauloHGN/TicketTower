import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './components/pages/landing/landing.component';
import { LoginComponent } from './components/pages/login/login.component';
import { HomeComponent } from './components/pages/home/home.component';
import { TarefasComponent } from './components/tarefas/tarefas.component';
import { ConfiguracaoComponent } from './components/configuracao/configuracao.component';
import { CriarTicketComponent } from './components/criarticket/criarticket.component';
import { NgModule } from '@angular/core';
import { CadastroComponent } from './components/cadastro/cadastro.component';
import { AuthGuard } from './auth/auth.guard';
import { CodigoComponent } from './components/pages/codigo/codigo.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NotFoundComponent } from './components/pages/not-found/not-found.component';
import { GerenciarUsuariosComponent } from './components/gerenciar-usuarios/gerenciar-usuarios.component';
import { TicketComponent } from './components/ticket/ticket.component';

export const routes: Routes = [
  { path: '', title: 'Ticket Tower', component: LandingComponent },
  { path: 'login', title: 'Entrar', component: LoginComponent },
  { path: 'redefinir', title: 'Esqueci a senha', component: CodigoComponent },
  {
    path: 'home',
    title: 'Página Inicial',
    component: HomeComponent,
    canActivate: [AuthGuard],

    children: [
      {
        path: 'fila-de-tickets',
        title: 'Fila de Tickets',
        component: TarefasComponent,
        canActivate: [AuthGuard],
      },

      {
        path: 'ticket/:ticketID',
        title: 'Ticket',
        component: TicketComponent,
        canActivate: [AuthGuard],
      },

      {
        path: 'cadastro',
        title: 'Cadastro',
        component: CadastroComponent,
        canActivate: [AuthGuard],
      },

      {
        path: 'criar-ticket',
        title: 'Criar Ticket',
        component: CriarTicketComponent,
        canActivate: [AuthGuard],
      },

      {
        path: 'relatorio',
        title: 'Relatório',
        component: DashboardComponent,
        canActivate: [AuthGuard],
      },

      {
        path: 'gerenciar-usuarios',
        title: 'Gerenciar Usuários',
        component: GerenciarUsuariosComponent,
        canActivate: [AuthGuard],
      },

      {
        path: 'configuracoes',
        title: 'Configurações',
        component: ConfiguracaoComponent,
        canActivate: [AuthGuard],
      },
    ],
  },

  { path: '**', title: 'Página não encontrada', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutes {}
