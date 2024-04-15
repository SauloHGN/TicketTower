import { Component } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { RouterModule } from '@angular/router';
import {
  lucideBarChart4,
  lucideNotepadText,
  lucideSettings2,
  lucideHome,
  lucideLogOut,
  lucideUserPlus,
  lucideUsers,
  lucideMenuSquare,
  lucideTicketPlus,
} from '@ng-icons/lucide';

@Component({
  selector: 'app-sidebar-cliente',
  standalone: true,
  imports: [NgIconComponent, RouterModule],
  templateUrl: './sidebar-cliente.component.html',
  styleUrl: './sidebar-cliente.component.css',
  viewProviders: [
    provideIcons({
      lucideBarChart4,
      lucideNotepadText,
      lucideSettings2,
      lucideHome,
      lucideLogOut,
      lucideUserPlus,
      lucideUsers,
      lucideMenuSquare,
      lucideTicketPlus,
    }),
  ],
})
export class SidebarClienteComponent {}
