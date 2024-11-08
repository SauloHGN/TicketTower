import { Component, OnInit } from '@angular/core';
import { FooterComponent } from '../../footer/footer.component';
import { CommonModule } from '@angular/common';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { lucideGithub, lucideMoon, lucideSun } from '@ng-icons/lucide';
import { ThemeService } from '../../../services/theme.service';
import { HeaderLandingComponent } from "../../header-landing/header-landing.component";

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [FooterComponent, CommonModule, NgIconComponent, HeaderLandingComponent],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css',
  viewProviders: [
    provideIcons({
      lucideGithub,
      lucideMoon,
      lucideSun,
    }),
  ],
})
export class LandingComponent {
  state: any;
  theme: boolean = false;

  constructor(private themeService: ThemeService) {}

  ngOnInit() {
    const value = localStorage.getItem('lightTheme');
    this.theme = value === 'true';
  }

  sendToGithub() {
    window.location.href = 'https://github.com/SauloHGN/TicketTower';
  }

  switchColorTheme() {
    this.themeService.switchTheme();
    const value = localStorage.getItem('lightTheme');
    this.theme = value === 'true';
  }
}
