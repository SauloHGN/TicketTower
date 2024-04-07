import { Component } from '@angular/core';
import { HlmTableDirective } from '@spartan-ng/ui-table-helm';
import { HlmTableComponent } from '../spartan/ui-table-helm/src/lib/hlm-table.component';
import { HlmCaptionComponent } from '../spartan/ui-table-helm/src/lib/hlm-caption.component';
import { HlmTrowComponent } from '../spartan/ui-table-helm/src/lib/hlm-trow.component';
import { HlmThComponent } from '../spartan/ui-table-helm/src/lib/hlm-th.component';
import { HlmTdComponent } from '../spartan/ui-table-helm/src/lib/hlm-td.component';

@Component({
  selector: 'app-tarefas',
  standalone: true,
  templateUrl: './tarefas.component.html',
  styleUrl: './tarefas.component.css',
  imports: [
    HlmTableDirective,
    HlmTableComponent,
    HlmCaptionComponent,
    HlmTrowComponent,
    HlmThComponent,
    HlmTdComponent,
  ],
})
export class TarefasComponent {}
