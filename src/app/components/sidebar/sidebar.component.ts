import { Component } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { RouterModule } from '@angular/router';
import {
  lucideBarChart4,
  lucideNotepadText,
  lucideSettings2,
  lucideHome,
  lucideLogOut,
} from '@ng-icons/lucide';
//import { radixGear, radixReader, radixHome } from '@ng-icons/radix-icons';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [NgIconComponent, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
  viewProviders: [
    provideIcons({
      lucideBarChart4,
      lucideNotepadText,
      lucideSettings2,
      lucideHome,
      lucideLogOut,
    }),
  ],
})
export class SidebarComponent {
  title = '';
}
