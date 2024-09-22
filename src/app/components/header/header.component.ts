import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../sharedService';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
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
