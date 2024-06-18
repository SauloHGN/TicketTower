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
import { RelatorioComponent } from './components/relatorio/relatorio.component';

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
        path: 'tarefas',
        title: 'Fila de Tickets',
        component: TarefasComponent,
        outlet: 'secundary',
        canActivate: [AuthGuard],
      },

      {
        path: 'cadastro',
        title: 'Cadastro',
        component: CadastroComponent,
        outlet: 'secundary',
        canActivate: [AuthGuard],
      },

      {
        path: 'CriarTicket',
        title: 'Criar Ticket',
        component: CriarTicketComponent,
        outlet: 'secundary',
        canActivate: [AuthGuard],
      },

      {
        path: 'relatorio',
        title: 'relatorio',
        component: RelatorioComponent,
        outlet: 'secundary',
        canActivate: [AuthGuard],
      },

      {
        path: 'configuracoes',
        title: 'Configurações',
        component: ConfiguracaoComponent,
        outlet: 'secundary',
        canActivate: [AuthGuard],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutes {}
