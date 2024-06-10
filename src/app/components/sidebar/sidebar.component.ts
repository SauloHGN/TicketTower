import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { Router, RouterModule } from '@angular/router';
import { LogoutService } from '../../services/logout.service';
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
import { userInfo } from '../../enum/userInfo';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [NgIconComponent, RouterModule, CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
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
export class SidebarComponent implements OnInit {
  title = '';
  userInfo: userInfo | null = null;
  constructor(private router: Router, private logoutService: LogoutService) {}

  ngOnInit(): void {
    const userInfo = sessionStorage.getItem('userInfo');

    if (userInfo) {
      this.userInfo = JSON.parse(userInfo);
    }
  }

  logout() {
    this.logoutService.Logout();
    this.router.navigate(['/']); // Redirecionar para a landing page
  }
}
