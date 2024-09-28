import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../sharedService';
import { CommonModule } from '@angular/common';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { lucideArrowRight } from '@ng-icons/lucide';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, NgIconComponent],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  viewProviders: [
    provideIcons({
      lucideArrowRight,
    }),
  ],
})
export class HeaderComponent implements OnInit {
  itemName: string = '';

  constructor(private sharedService: SharedService) {}

  ngOnInit() {
    this.sharedService.itemName$.subscribe((name: string) => {
      this.itemName = name;
    });
  }
}
