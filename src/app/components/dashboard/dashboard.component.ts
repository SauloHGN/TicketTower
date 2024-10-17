import { style } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import ApexCharts from 'apexcharts'; // Certifique-se de que a biblioteca está instalada

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'], // Corrigido de styleUrl para styleUrls
})
export class DashboardComponent implements OnInit {
  private options: any;
  private circularChartOptions: any;
  getDonutChartOptions: () => {
    series: number[];
    colors: string[];
    chart: { height: number; width: string; type: string };
    stroke: { colors: string[] };
    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: boolean;
            name: { show: boolean; fontFamily: string; offsetY: number };
            total: {
              showAlways: boolean;
              show: boolean;
              label: string;
              fontFamily: string;
              formatter: (w: any) => string;
            };
            value: {
              show: boolean;
              fontFamily: string;
              offsetY: number;
              formatter: (value: any) => string;
            };
          };
          size: string;
        };
      };
    };
    labels: string[];
    legend: { position: string; fontFamily: string };
  };
  getChartBarOptions: () => void;

  constructor() {
    this.options = {
      chart: {
        height: '100%',
        maxWidth: '100%',
        type: 'line',
        fontFamily: 'Poppins, sans-serif',
        dropShadow: {
          enabled: false,
        },
        toolbar: {
          show: false,
        },
      },
      tooltip: {
        enabled: true,
        x: {
          show: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        width: 6,
        curve: 'smooth', // Mover a propriedade 'curve' para aqui
      },
      grid: {
        show: true,
        strokeDashArray: 4,
        padding: {
          left: 2,
          right: 2,
          top: -26,
        },
      },
      series: [
        {
          name: 'Clicks',
          data: [6500, 6418, 6456, 6526, 6356, 6456],
          color: '#1A56DB',
        },
        {
          name: 'CPC',
          data: [6456, 6356, 6526, 6332, 6418, 6500],
          color: '#7E3AF2',
        },
      ],
      legend: {
        show: false,
      },
      xaxis: {
        categories: [
          '01 Feb',
          '02 Feb',
          '03 Feb',
          '04 Feb',
          '05 Feb',
          '06 Feb',
          '07 Feb',
        ],
        labels: {
          show: true,
          style: {
            fontFamily: 'Poppins, sans-serif',
            cssClass: 'text-xs font-normal fill-gray-500 dark:fill-gray-400',
          },
        },
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
      },
      yaxis: {
        show: false,
      },
    };

    this.circularChartOptions = () => {
      return {
        series: [52.8, 26.8, 20.4],
        colors: ['#1C64F2', '#16BDCA', '#9061F9'],
        chart: {
          height: 420,
          width: '100%',
          type: 'pie',
        },
        stroke: {
          colors: ['white'], // Cor do contorno
        },
        plotOptions: {
          pie: {
            labels: {
              show: true,
              style: {
                colors: ['var(--primary-font-color)'],
              },
            },
            dataLabels: {
              offset: -25,
            },
          },
        },
        labels: ['Direct', 'Organic search', 'Referrals'],
        dataLabels: {
          enabled: true,
          style: {
            fontFamily: 'Poppins, sans-serif',
            colors: ['var(--primary-font-color)'],
          },
        },
        legend: {
          position: 'bottom',
          fontFamily: 'Poppins, sans-serif',
          style: {
            colors: ['var(--primary-font-color)'],
          },
        },
      };
    };

    this.getDonutChartOptions = () => {
      return {
        series: [35.1, 23.5, 2.4, 5.4],
        colors: ['#dd3636', '#ea580c', '#ca8a04', '#2563eb'],
        chart: {
          height: 320,
          width: '100%',
          type: 'donut',
        },
        stroke: {
          colors: ['transparent'],
        },
        plotOptions: {
          color: ['var(--primary-font-color)'],
          pie: {
            donut: {
              style:{
                color: ['var(--primary-font-color)'],
              },
              labels: {
                show: true,
                color: ['var(--primary-font-color)'],
                name: {
                  show: true,
                  fontFamily: 'Poppins, sans-serif',
                  offsetY: 20,
                  style: {
                    color: 'var(--primary-font-color)',
                  },
                },
                total: {
                  showAlways: true,
                  show: true,
                  label: 'Unique visitors',
                  style:{
                    color: ['var(--primary-font-color)'],
                  },
                  fontFamily: 'Poppins, sans-serif',
                  color: 'var(--primary-font-color)',
                  formatter: function (w: any) {
                    const sum = w.globals.seriesTotals.reduce(
                      (a: any, b: any) => a + b,
                      0
                    );
                    return '$' + sum + 'k';
                  },
                },
                value: {
                  show: true,
                  fontFamily: 'Poppins, sans-serif',
                  offsetY: -20,
                  formatter: function (value: any) {
                    return value + 'k';
                  },
                  style: {
                    color: 'var(--primary-font-color)',
                  },
                },
              },
              size: '80%',
            },
          },
        },
        dataLabels: {
          enabled: false,
          formatter: function (val: any, opts: any) {
            return opts.w.config.series[opts.seriesIndex]; // Retorna apenas o valor numérico
          },
          style:{
            color: ['var(--primary-font-color)'],
          }
        },
        labels: ['Direct', 'Sponsor', 'Affiliate', 'Email marketing'],

        legend: {
          position: 'bottom',
          fontFamily: 'Poppins, sans-serif',
          fillColor: undefined,
          color: 'var(--primary-font-color)',
          style: {
            colors: ['var(--primary-font-color)'], // Cor do texto da legenda
            color: ['var(--primary-font-color)'],
          },
        },
      };
    };

    this.getChartBarOptions = () => {
      return {
        colors: ['#1A56DB', '#FDBA8C'],
        series: [
          {
            name: 'Organic',
            color: '#1A56DB',
            data: [
              { x: 'Mon', y: 231 },
              { x: 'Tue', y: 122 },
              { x: 'Wed', y: 63 },
              { x: 'Thu', y: 421 },
              { x: 'Fri', y: 122 },
              { x: 'Sat', y: 323 },
              { x: 'Sun', y: 111 },
            ],
          },
          {
            name: 'Social media',
            color: '#FDBA8C',
            data: [
              { x: 'Mon', y: 232 },
              { x: 'Tue', y: 113 },
              { x: 'Wed', y: 341 },
              { x: 'Thu', y: 224 },
              { x: 'Fri', y: 522 },
              { x: 'Sat', y: 411 },
              { x: 'Sun', y: 243 },
            ],
          },
        ],
        chart: {
          type: 'bar',
          height: '320px',
          fontFamily: 'Inter, sans-serif',
          toolbar: {
            show: false,
          },
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: '70%',
            borderRadiusApplication: 'end',
            borderRadius: 8,
          },
        },
        tooltip: {
          shared: true,
          intersect: false,
          style: {
            fontFamily: 'Inter, sans-serif',
          },
        },
        states: {
          hover: {
            filter: {
              type: 'darken',
              value: 1,
            },
          },
        },
        stroke: {
          show: true,
          width: 0,
          colors: ['transparent'],
        },
        grid: {
          show: false,
          strokeDashArray: 4,
          padding: {
            left: 2,
            right: 2,
            top: -14,
          },
        },
        dataLabels: {
          enabled: false,
        },
        legend: {
          show: false,
        },
        xaxis: {
          floating: false,
          labels: {
            show: true,
            style: {
              fontFamily: 'Inter, sans-serif',
              cssClass: 'text-xs font-normal fill-gray-500 dark:fill-gray-400',
            },
          },
          axisBorder: {
            show: false,
          },
          axisTicks: {
            show: false,
          },
        },
        yaxis: {
          show: false,
        },
        fill: {
          opacity: 1,
        },
      };
    };
  }

  ngOnInit() {
    // Renderizar o gráfico no ngOnInit

    this.renderLineChart();

    this.renderDonutChart();

    this.renderChartBar();
  }

  renderChartBar() {
    if (
      document.getElementById('column-chart') &&
      typeof ApexCharts !== 'undefined'
    ) {
      const chartBar = new ApexCharts(
        document.getElementById('column-chart'),
        this.getChartBarOptions()
      );
      chartBar.render();
    }
  }

  renderLineChart() {
    if (
      document.getElementById('line-chart') &&
      typeof ApexCharts !== 'undefined'
    ) {
      const chart = new ApexCharts(
        document.getElementById('line-chart'),
        this.options
      );
      chart.render();
    }
  }

  donutChart!: ApexCharts;
  renderDonutChart() {
    if (
      document.getElementById('donut-chart') &&
      typeof ApexCharts !== 'undefined'
    ) {
      const donutChart = new ApexCharts(
        document.getElementById('donut-chart'),
        this.getDonutChartOptions()
      );
      donutChart.render();
    }
  }
}
