import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../auth/auth.service';
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
import { userInfo } from '../../../enum/userInfo';
import { SharedService } from '../../../sharedService';

@Component({
  selector: 'funcionario-sidebar',
  standalone: true,
  imports: [NgIconComponent, RouterModule, CommonModule],
  templateUrl: './funcionario-sidebar.component.html',
  styleUrl: './funcionario-sidebar.component.css',
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
export class FuncionarioSidebarComponent implements OnInit {
  title = '';
  userInfo: userInfo | null = null;

  constructor(
    private router: Router,
    private AuthService: AuthService,
    private sharedService: SharedService
  ) {}

  ngOnInit(): void {
    const userInfo = sessionStorage.getItem('userInfo');

    if (userInfo) {
      this.userInfo = JSON.parse(userInfo);
    }
  }

  logout() {
    // this.AuthService.Logout();
    // this.router.navigate(['/']); // Redirecionar para a landing page
    this.sharedService.openModal();
  }

  sendValueToHeader(value: string) {
    this.sharedService.updateItemName(value);
  }
}
