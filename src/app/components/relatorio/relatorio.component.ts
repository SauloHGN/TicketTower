import { Component, Input, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexNonAxisChartSeries,
  ApexTitleSubtitle,
  NgApexchartsModule,
} from 'ng-apexcharts';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-relatorio',
  standalone: true,
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    NgApexchartsModule,
  ],
  templateUrl: './relatorio.component.html',
  styleUrl: './relatorio.component.css',
})
export class RelatorioComponent {
  @Input()
  series!: ApexAxisChartSeries | ApexNonAxisChartSeries;
  @Input()
  chart!: ApexChart;
  @Input()
  title!: ApexTitleSubtitle;
}
