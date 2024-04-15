import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarClienteComponent } from '../../../sidebar-cliente/sidebar-cliente.component';
import { HeaderComponent } from '../../../header/header.component';
import { TarefasComponent } from '../../../tarefas/tarefas.component';

@Component({
  selector: 'app-home-cliente',
  standalone: true,
  imports: [
    SidebarClienteComponent,
    HeaderComponent,
    TarefasComponent,
    RouterOutlet,
  ],
  templateUrl: './home-cliente.component.html',
  styleUrl: './home-cliente.component.css',
})
export class HomeClienteComponent {}
