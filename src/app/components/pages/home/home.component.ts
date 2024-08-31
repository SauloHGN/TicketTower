import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AdminSidebarComponent } from '../../sidebars/admin-sidebar/admin-sidebar.component';
import { FuncionarioSidebarComponent } from '../../sidebars/funcionario-sidebar/funcionario-sidebar.component';
import { ClienteSidebarComponent } from '../../sidebars/cliente-sidebar/cliente-sidebar.component';
import { HeaderComponent } from '../../header/header.component';
import { TarefasComponent } from '../../tarefas/tarefas.component';
import { CadastroComponent } from '../../cadastro/cadastro.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    TarefasComponent,
    CadastroComponent,
    AdminSidebarComponent,
    FuncionarioSidebarComponent,
    ClienteSidebarComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  title = 'Homepage';
}
