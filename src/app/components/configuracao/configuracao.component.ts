import { Component } from '@angular/core';
import { HlmDialogFooterComponent } from '../spartan/ui-dialog-helm/src/lib/hlm-dialog-footer.component';
import { HlmDialogHeaderComponent } from '../spartan/ui-dialog-helm/src/lib/hlm-dialog-header.component';
import { HlmDialogContentComponent } from '../spartan/ui-dialog-helm/src/lib/hlm-dialog-content.component';
import { HlmDialogComponent } from '../spartan/ui-dialog-helm/src/lib/hlm-dialog.component';

@Component({
  selector: 'app-configuracao',
  standalone: true,
  templateUrl: './configuracao.component.html',
  styleUrl: './configuracao.component.css',
  imports: [
    HlmDialogFooterComponent,
    HlmDialogHeaderComponent,
    HlmDialogContentComponent,
    HlmDialogComponent,
  ],
})
export class ConfiguracaoComponent {}
