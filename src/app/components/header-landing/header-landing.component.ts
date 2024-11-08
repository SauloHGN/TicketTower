import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../services/theme.service';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { lucideGithub, lucideMoon, lucideSun } from '@ng-icons/lucide';

@Component({
  selector: 'app-header-landing',
  standalone: true,
  imports: [CommonModule, NgIconComponent],
  templateUrl: './header-landing.component.html',
  styleUrl: './header-landing.component.css',
  viewProviders: [
    provideIcons({
      lucideGithub,
      lucideMoon,
      lucideSun,
    }),
  ],
})
export class HeaderLandingComponent {
  state: boolean = false;
  theme: boolean = false;

  constructor(private themeService: ThemeService) {}

  ngOnInit() {
    const value = localStorage.getItem('lightTheme');
    this.theme = value === 'true';
  }

  sendToGithub() {
    //window.location.href = 'https://github.com/SauloHGN/TicketTower';
    window.open('https://github.com/SauloHGN/TicketTower', '_blank');
  }

  switchColorTheme() {
    this.themeService.switchTheme();
    const value = localStorage.getItem('lightTheme');
    this.theme = value === 'true';
  }

  toggleMenu() {
    this.state = !this.state;
  }
}
