import { Component } from '@angular/core';
import { FooterComponent } from '../../footer/footer.component';
import { CommonModule } from '@angular/common';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { lucideGithub } from '@ng-icons/lucide';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [FooterComponent, CommonModule, NgIconComponent],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css',
  viewProviders: [
    provideIcons({
      lucideGithub,
    }),
  ],
})
export class LandingComponent {
  state: any;

  toggleMenu() {}
}
