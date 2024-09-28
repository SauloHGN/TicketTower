import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LandingComponent } from './components/pages/landing/landing.component';
import { ThemeService } from './services/theme.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LandingComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'Ticket Tower';
  constructor(private themeService: ThemeService) {}

  ngOnInit() {
    this.themeService.loadTheme(); // Carrega o tema ao iniciar
  }
}
