import { style } from '@angular/animations';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import ApexCharts from 'apexcharts'; // Certifique-se de que a biblioteca está instalada
import { Observable } from 'rxjs';
import { ThemeService } from '../../services/theme.service';
import { DashboardMetrics } from '../../enum/dashboardMetrics';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'], // Corrigido de styleUrl para styleUrls
})
export class DashboardComponent implements OnInit {
  private apiUrl = 'http://localhost:3000/relatorios';
  private options: any;
  private circularChartOptions: any;

  getDonutChartOptions = () => {
    let series = this.dataPriorityDistribuition.map((item) =>
      parseInt(item.count)
    );
    const labels = this.dataPriorityDistribuition.map(
      (item) => item.ticket_prioridade
    );

    const allZero = series.every((value) => value === 0);

    // Se todos os valores forem zero, define uma série padrão
    if (allZero) {
      series = [1]; // Um valor mínimo para manter o donut visível
      labels.push('Nenhum dado'); // Label para indicar ausência de dados
    }

    return {
      series: series,
      labels: labels,
      colors: allZero
        ? ['#e0e0e0']
        : ['#dd3636', '#ea580c', '#ca8a04', '#2563eb'],
      chart: {
        height: 320,
        width: '100%',
        type: 'donut',
      },
      stroke: {
        width: allZero ? 1 : 0,
        colors: ['#ffffff'],
      },
      plotOptions: {
        color: ['var(--primary-font-color)'],
        pie: {
          donut: {
            style: {
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
                label: 'Total',
                style: {
                  color: ['var(--primary-font-color)'],
                },
                fontFamily: 'Poppins, sans-serif',
                fontWeight: 'bold',
                fontSize: '16px',
                color: 'var(--primary-font-color)',
                labels: {
                  colors: 'var(--placeholder-default)',
                },
                formatter: function (w: any) {
                  const sum = w.globals.seriesTotals.reduce(
                    (a: any, b: any) => a + b,
                    0
                  );
                  return +sum + ' ' + 'Tickets';
                },
              },
              value: {
                show: true,
                label: '',
                fontFamily: 'Poppins, sans-serif',
                fontWeight: 'bold',
                fontSize: '16px',
                offsetY: -20,
                labels: {
                  colors: 'var(--placeholder-default)',
                },
                formatter: function (value: any) {
                  return value + ' ' + 'Tickets';
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
        fontWeight: 'bold',
        fontSize: '16px',
        labels: {
          colors: 'var(--placeholder-default)',
        },
        formatter: function (val: any, opts: any) {
          return opts.w.config.series[opts.seriesIndex]; // Retorna apenas o valor numérico
        },
        style: {
          color: ['var(--primary-font-color)'],
        },
      },

      legend: {
        position: 'bottom',
        fontFamily: 'Poppins, sans-serif',
        fontSize: '12px',
        fillColor: 'var(--placeholder-default)',
        color: 'var(--placeholder-default)',
        labels: {
          colors: [
            'var(--placeholder-default)',
            'var(--placeholder-default)',
            'var(--placeholder-default)',
            'var(--placeholder-default)',
          ], // Cor para cada item da legenda
        },
        style: {
          colors: ['var(--placeholder-default)'], // Cor do texto da legenda
          color: ['var(--placeholder-default)'],
        },
      },
    };
  };

  getChartLineOptions = () => {
    const priorities = this.dataChartLine.map((item) => item.priority);
    const avgResolutionTimes = this.dataChartLine.map((item) =>
      parseFloat(item.avgResolutionTime)
    );

    // Opções do gráfico
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
          show: true,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        width: 6,
        curve: 'smooth', // Curvando a linha para suavizar o gráfico
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
          name: 'Tempo Médio de Resolução',
          data: avgResolutionTimes, // Usando os dados de tempo médio de resolução
          color: '#3b82f6', // Cor azul para a série
        },
      ],
      legend: {
        show: false,
      },
      xaxis: {
        categories: priorities, // Usando prioridades como categorias no eixo X
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
        show: true, // Agora mostramos o eixo Y para o tempo
        labels: {
          style: {
            fontFamily: 'Poppins, sans-serif',
            cssClass:
              'text-xs font-normal fill-gray-500 dark:fill-gray-400 pt-1',
          },
          offSetY: 5,
          formatter: function (value: number) {
            return value + ' h'; // Adiciona a unidade de horas (h)
          },
        },
        axisBorder: {
          show: false,
        },
      },
    };
  };

  ticketDataChartBar = [
    { setor: 'Geral', month: '2024-10', count: 0 },
    { setor: 'Marketing', month: '2024-10', count: 0 },
    { setor: 'Financeiro', month: '2024-10', count: 0 },
    { setor: 'Recursos Humanos', month: '2024-10', count: 0 },
    { setor: 'Administrativo', month: '2024-10', count: 0 },
    { setor: 'Tecnologia', month: '2024-10', count: 0 },
    // Dados dinamicos
  ];

  totalTicketsChartBar: number = 0;

  getChartBarOptions = () => {
    this.totalTicketsChartBar = this.ticketDataChartBar.reduce(
      (total, item) => {
        return total + Number(item.count); // Converter o count de string para número
      },
      0
    );

    // Agrupar dados por setor
    const groupedData = this.ticketDataChartBar.reduce(
      (acc: { [key: string]: { x: string; y: number }[] }, item) => {
        if (!acc[item.setor]) {
          acc[item.setor] = [];
        }
        acc[item.setor].push({ x: item.month, y: item.count });
        return acc;
      },
      {}
    );

    // Criar a série para o gráfico com base nos dados agrupados
    const series = Object.keys(groupedData).map((setor) => ({
      name: setor,
      color:
        setor === 'Geral'
          ? '#1A56DB'
          : setor === 'Marketing'
          ? '#FDBA8C'
          : setor === 'Financeiro'
          ? '#329132'
          : setor === 'Tecnologia'
          ? '#7F8C8D'
          : setor === 'Administrativo'
          ? '#5b2cb2'
          : '#FFC107', // Exemplo de cores dinâmicas
      data: groupedData[setor],
    }));

    // Configuração do gráfico
    return {
      colors: ['#1A56DB', '#FDBA8C', '#FFC107'],
      series: series,
      chart: {
        type: 'bar',
        height: '320px',
        fontFamily: 'Inter, sans-serif',
        toolbar: { show: false },
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
        show: true,
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
        show: true,
      },
      fill: {
        opacity: 1,
      },
    };
  };

  constructor(private http: HttpClient, private cdr: ChangeDetectorRef, private toastService: ToastrService) {
    this.getChartLineOptions();

    this.getDonutChartOptions();

    this.getChartBarOptions();

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
  }

  getUserInfo() {
    const userInfo = sessionStorage.getItem('userInfo');
    if (userInfo) {
      var user = JSON.parse(userInfo);
      return user;
    }
  }

  ngOnInit() {
    const user = this.getUserInfo();

    this.renderLineChart();
    this.renderDonutChart();
    this.renderChartBar();

    this.getAverageResolutionTime(user.id, user.permissao);
    this.getStatusSummary(user.id, user.permissao);
    this.getPriorityDistribution(user.id, user.permissao);
    this.getTicketEvolution(user.id, user.permissao);
    this.getDashboardMetrics(user.id, user.permissao);
  }

  chartBar: any;
  renderChartBar() {
    if (
      document.getElementById('column-chart') &&
      typeof ApexCharts !== 'undefined'
    ) {
      const chartBar = new ApexCharts(
        document.getElementById('column-chart'),
        this.getChartBarOptions()
      );

      if (this.chartBar) {
        this.chartBar.destroy();
      }

      // Renderizando o novo gráfico
      this.chartBar = chartBar;
      chartBar.render();
    }
  }

  chart: any;
  renderLineChart() {
    // Verificando se o gráfico precisa ser renderizado
    if (
      document.getElementById('line-chart') &&
      typeof ApexCharts !== 'undefined'
    ) {
      const chart = new ApexCharts(
        document.getElementById('line-chart'),
        this.options
      );

      // Destruindo o gráfico anterior, caso exista, antes de criar o novo
      if (this.chart) {
        this.chart.destroy();
      }

      // Renderizando o novo gráfico
      this.chart = chart;
      chart.render();
    }
  }

  donutChart!: ApexCharts;
  renderDonutChart() {
    // Destroi o gráfico antigo, se ele já existir
    if (this.donutChart) {
      this.donutChart.destroy();
    }

    // Cria uma nova instância do gráfico com os dados atualizados
    const options = this.getDonutChartOptions();
    this.donutChart = new ApexCharts(
      document.getElementById('donut-chart'),
      options
    );
    this.donutChart.render();
  }

  // 1. Status dos Tickets

  ticketStatus = [
    { ticket_status: 'aberto', count: '0' },
    { ticket_status: 'em andamento', count: '0' },
    { ticket_status: 'resolvido', count: '0' },
    { ticket_status: 'vencido', count: '0' },
  ];

  // Variáveis para armazenar as contagens de cada status
  abertoCount = 0;
  andamentoCount = 0;
  resolvidoCount = 0;
  vencidoCount = 0;

  // Método para obter o resumo dos status dos tickets
  getStatusSummary(userId: string, userType: string) {
    this.http
      .get<any[]>(
        `http://localhost:3000/relatorio/ticketStatus/${userId}/${userType}`
      )
      .subscribe(
        (data) => {
          // Atualizar os status
          this.updateTicketStatus(data);
        },
        (error) => {
          console.error('Erro ao carregar os status dos tickets:', error);
          // Se ocorrer erro, você pode exibir uma mensagem ao usuário
        }
      );
  }

  // Função para atualizar o ticketStatus com os dados recebidos
  updateTicketStatus(data: any[]) {
    // Para cada item no retorno da API, buscamos o status correspondente e atualizamos a contagem
    data.forEach((item) => {
      const status = item.ticket_status.trim().toLowerCase(); // Converte para minúsculas e remove espaços extras
      const statusItem = this.ticketStatus.find(
        (statusObj) => statusObj.ticket_status === status
      );

      if (statusItem) {
        statusItem.count = item.count; // Atualiza a contagem para o status correspondente
      }
    });

    // Atualizar as variáveis de contagem
    this.updateCounts();
  }

  // Função para atualizar as contagens das variáveis
  updateCounts() {
    this.abertoCount = this.getStatusCount('aberto');
    this.andamentoCount = this.getStatusCount('em andamento');
    this.resolvidoCount = this.getStatusCount('resolvido');
    this.vencidoCount = this.getStatusCount('vencido');
  }

  // Função para obter a contagem de um status específico
  getStatusCount(status: string): number {
    const statusItem = this.ticketStatus.find(
      (statusObj) => statusObj.ticket_status === status
    );
    return statusItem ? parseInt(statusItem.count, 10) : 0;
  }

  dataPriorityDistribuition = [
    { ticket_prioridade: 'urgente', count: '1' },
    { ticket_prioridade: 'alta', count: '1' },
    { ticket_prioridade: 'média', count: '1' },
    { ticket_prioridade: 'normal', count: '1' },
  ];

  toggleDropdownDonut() {
    const dropdown = document.getElementById('menuDateTimeDonut');
    dropdown?.classList.toggle('hidden'); // Alterna a classe 'hidden' para mostrar ou esconder
  }

  timeOptionDonut: any;

  // Função para capturar o valor selecionado e atualizar o botão
  selectOption(timeOptionDonut: string) {
    this.timeOptionDonut = timeOptionDonut;
    const button = document.getElementById('buttonDonut');
    if (button) {
      button.innerHTML = `
      ${
        timeOptionDonut === 'hoje'
          ? 'Hoje'
          : timeOptionDonut === 'semana'
          ? 'Semana'
          : timeOptionDonut === 'mes'
          ? 'Mês'
          : timeOptionDonut === 'ano'
          ? 'Ano'
          : timeOptionDonut === 'todo_periodo'
          ? 'Todo periodo'
          : timeOptionDonut === 'Selecione'
      }
      <svg
        class="w-2.5 h-2.5 ms-2.5"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 10 6"
      >
        <path
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="m1 1 4 4 4-4"
        />
      </svg>
    `;
    }
    this.toggleDropdownDonut();
    const user = this.getUserInfo();
    this.getPriorityDistribution(user.id, user.permissao);
  }

  // 2. Distribuição de Prioridade dos Tickets
  getPriorityDistribution(userId: string, userType: string) {
    const periodo = this.timeOptionDonut ? this.timeOptionDonut : 'default';
    try {
      this.http
        .get<any[]>(
          `http://localhost:3000/relatorio/ticketsPriority/${userId}/${userType}/${periodo}`
        )
        .subscribe((data) => {
          this.dataPriorityDistribuition = [...data];

          const seriesData = this.dataPriorityDistribuition.map((item) =>
            Number(item.count)
          );

          if (this.donutChart) {
            this.getDonutChartOptions().series = seriesData;
            this.donutChart.updateSeries(seriesData);
          }

          this.cdr.detectChanges();
        });
    } catch {
     this.toastService.error('Erro ao se comunicar com o servidor');
    }
  }

  dataChartLine = [
    { priority: 'urgente', avgResolutionTime: '0.0000' },
    { priority: 'alta', avgResolutionTime: '0.0000' },
    { priority: 'média', avgResolutionTime: '0.0000' },
    { priority: 'normal', avgResolutionTime: '0.0000' },
  ];

  // 3. Evolução dos Tickets ao Longo do Tempo
  getTicketEvolution(userId: string, userType: string) {
    try {
      this.http
        .get<any[]>(
          `http://localhost:3000/relatorio/ticketEvolution/${userId}/${userType}`
        )
        .subscribe((data) => {
          this.ticketDataChartBar = data.map((item) => ({
            setor: item.setor,
            month: item.month,
            count: item.count,
          }));

          // Agora chame a função para obter as opções do gráfico com os dados atualizados
          this.getChartBarOptions();

          // Renderize o gráfico novamente com as novas opções
          this.renderChartBar();
        });
    } catch {
      this.toastService.error('Erro ao se comunicar com o servidor');
    }
  }

  toggleDropdownLine() {
    const dropdown = document.getElementById('menuDateAvgTime');
    dropdown?.classList.toggle('hidden'); // Alterna a classe 'hidden' para mostrar ou esconder
  }

  timeOptionLine: any;

  // Função para capturar o valor selecionado e atualizar o botão
  selectOptionLine(timeOptionDonut: string) {
    this.timeOptionDonut = timeOptionDonut;
    const button = document.getElementById('buttonLine');
    if (button) {
      button.innerHTML = `
      ${
        timeOptionDonut === 'hoje'
          ? 'Hoje'
          : timeOptionDonut === 'semana'
          ? 'Semana'
          : timeOptionDonut === 'mes'
          ? 'Mês'
          : timeOptionDonut === 'ano'
          ? 'Ano'
          : timeOptionDonut === 'todo_periodo'
          ? 'Todo periodo'
          : timeOptionDonut === 'Selecione'
      }
      <svg
        class="w-2.5 h-2.5 ms-2.5"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 10 6"
      >
        <path
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="m1 1 4 4 4-4"
        />
      </svg>
    `;
    }
    this.toggleDropdownLine();
    const user = this.getUserInfo();
    this.getAverageResolutionTime(user.id, user.permissao);
  }

  // 4. Tempo Médio de Resolução por Prioridade
  getAverageResolutionTime(userId: string, userType: string) {
    const periodo = this.timeOptionLine ? this.timeOptionLine : 'default';
    try {
      this.http
        .get<any[]>(
          `http://localhost:3000/relatorio/ticketTimeResolution/${userId}/${userType}/${periodo}`
        )
        .subscribe((data) => {
          this.dataChartLine = data;

          this.getChartLineOptions();

          // Renderizando o gráfico novamente com os novos dados
          this.renderLineChart();
        });
    } catch {
      this.toastService.error('Erro ao se comunicar com o servidor');
    }
  }

  dashboardMetrics: DashboardMetrics = {
    taxaResolucao: 0,
    ticketsAbertos: 0,

    totalTickets: 0,
    ticketsResolvidos: 0,

    taxaVencimento: 0,
    ticketsVencidos: 0,

    totalFechados: 0,
    taxaFechados: 0,
  };

  getDashboardMetrics(userId: string, userType: string) {
    this.http
      .get<DashboardMetrics>(
        `http://localhost:3000/relatorio/metricas/${userId}/${userType}`
      )
      .subscribe({
        next: (data) => {
          this.dashboardMetrics = data;
        },
        error: (err) => {
          console.error('Erro ao se comunicar com o servidor', err);
        },
      });
  }
}
