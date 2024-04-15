import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarFuncionarioComponent } from '../../../sidebar-funcionario/sidebar-funcionario.component';
import { HeaderComponent } from '../../../header/header.component';
import { TarefasComponent } from '../../../tarefas/tarefas.component';

@Component({
  selector: 'app-home-funcionario',
  standalone: true,
  imports: [
    SidebarFuncionarioComponent,
    HeaderComponent,
    TarefasComponent,
    RouterOutlet,
  ],
  templateUrl: './home-funcionario.component.html',
  styleUrl: './home-funcionario.component.css',
})
export class HomeFuncionarioComponent {}
