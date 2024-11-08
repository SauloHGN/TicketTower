import { Component } from '@angular/core';
import { HeaderLandingComponent } from "../../header-landing/header-landing.component";
import { FooterComponent } from "../../footer/footer.component";

@Component({
  selector: 'app-documentacao',
  standalone: true,
  imports: [HeaderLandingComponent, FooterComponent],
  templateUrl: './documentacao.component.html',
  styleUrl: './documentacao.component.css'
})
export class DocumentacaoComponent {

}
