import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './components/pages/landing/landing.component';
import { LoginComponent } from './components/pages/login/login.component';
import { HomeComponent } from './components/pages/admin/home/home.component';
import { HomeClienteComponent } from './components/pages/cliente/home-cliente/home-cliente.component';
import { HomeFuncionarioComponent } from './components/pages/funcionario/home-funcionario/home-funcionario.component';
import { TarefasComponent } from './components/tarefas/tarefas.component';
import { ConfiguracaoComponent } from './components/configuracao/configuracao.component';

import { NgModule } from '@angular/core';

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
        component: TarefasComponent,
        outlet: 'secundary',
      },

      {
        path: 'configuracoes',
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
        component: TarefasComponent,
        outlet: 'secundary',
      },

      {
        path: 'configuracoes',
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
        component: TarefasComponent,
        outlet: 'secundary',
      },

      {
        path: 'configuracoes',
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
