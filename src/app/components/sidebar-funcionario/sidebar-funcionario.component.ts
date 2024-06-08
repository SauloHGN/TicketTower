import { Component } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { Router, RouterModule } from '@angular/router';
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
import { LogoutService } from '../../services/logout.service';

@Component({
  selector: 'app-sidebar-funcionario',
  standalone: true,
  imports: [NgIconComponent, RouterModule],
  templateUrl: './sidebar-funcionario.component.html',
  styleUrl: './sidebar-funcionario.component.css',
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
export class SidebarFuncionarioComponent {
  title = '';
  constructor(private router: Router, private logoutService: LogoutService) {}

  logout() {
    this.logoutService.Logout();
    this.router.navigate(['/']); // Redirecionar para a landing page
  }
}
