import { Component } from '@angular/core';
import { FooterComponent } from "../../footer/footer.component";

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [FooterComponent],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css',
})
export class LandingComponent {}
