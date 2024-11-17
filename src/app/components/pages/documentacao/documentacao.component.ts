import { Component } from '@angular/core';
import { HeaderLandingComponent } from '../../header-landing/header-landing.component';
import { FooterComponent } from '../../footer/footer.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-documentacao',
  standalone: true,
  imports: [HeaderLandingComponent, FooterComponent, CommonModule],
  templateUrl: './documentacao.component.html',
  styleUrl: './documentacao.component.css',
})
export class DocumentacaoComponent {
  TicketTower: string = `Somos uma equipe dedicada a desenvolver soluções que simplificam a
          gestão e o atendimento ao cliente para pequenas empresas. Nosso
          projeto é um protótipo de Service Desk, criado para gerenciar chamados
          internos e externos.
          <br><br>
          Compreendemos a importância da inovação e da colaboração na evolução
          dos negócios. Por isso, decidimos disponibilizar nosso protótipo
          gratuitamente, permitindo que outras empresas e desenvolvedores possam
          utilizá-lo, adaptá-lo e aprimorá-lo de acordo com suas necessidades
          específicas.`;

  textTabelaComparativa: string = `Uma breve comparação entre alguns sistemas de Service Desk e Help Desk.`;

  preRequisitos: string = `Certifique-se de que os seguintes requisitos estão atendidos antes de prosseguir com a instalação:<br>
      Node.js versão: 20.15.1 ou superior <br>
      NPM (gerenciador de pacotes)<br>
      Angular CLI versão: 17.2.2 <br>
      Nest CLI versão: 10.0.0 ou superiror<br>
      instalação previa do MySQL, em caso de utilização de outro tipo de banco de dados é necessários
      alterar as configurações para integração com TypeORM.
    `;

  codeCardWindows = `
  <aside class="bg-[var(--card-background-color)] text-white p-6 rounded-lg w-full max-w-md">
  <div class="flex justify-between items-center">
    <div class="flex space-x-2 text-red-500">
      <div class="w-3 h-3 rounded-full bg-red-500"></div>
      <div class="w-3 h-3 rounded-full bg-yellow-500"></div>
      <div class="w-3 h-3 rounded-full bg-green-500"></div>
    </div>
  </div>
  <div class="mt-4">
    <p class="text[var(--primary-font-color)]"> Instalar Front-end</p> <br>
    <p class="text-[var(--secundary-highlighted-text-color)]"> $ npm install -g @angular/cli</p>
    <p class="text-[var(--secundary-highlighted-text-color)]"> $ npm install </p>
    <p class="text-[var(--secundary-highlighted-text-color)]"> $ ng serve </p>
    <br><br>

    <p class="text[var(--primary-font-color)]"> Instalar Back-end</p> <br>
    <p class="text-[var(--secundary-highlighted-text-color)]"> $ cd backend</p>
    <p class="text-[var(--secundary-highlighted-text-color)]"> $ npm i -g @nestjs/cli</p>
    <p class="text-[var(--secundary-highlighted-text-color)]"> $ npm install</p>
    <p class="text-[var(--secundary-highlighted-text-color)]"> $ npm run start:dev </p>
  </div>
</aside>`;

  codeCardLinuxMac = `
  <aside class="bg-[var(--card-background-color)] text-white p-6 rounded-lg w-full max-w-md">
  <div class="flex justify-between items-center">
    <div class="flex space-x-2 text-red-500">
      <div class="w-3 h-3 rounded-full bg-red-500"></div>
      <div class="w-3 h-3 rounded-full bg-yellow-500"></div>
      <div class="w-3 h-3 rounded-full bg-green-500"></div>
    </div>
  </div>
  <div class="mt-4">
    <p class="text[var(--primary-font-color)]"> Instalar Front-end</p> <br>
    <p class="text-[var(--secundary-highlighted-text-color)]"> $ sudo npm install -g @angular/cli</p>
    <p class="text-[var(--secundary-highlighted-text-color)]"> $ sudo npm install </p>
    <p class="text-[var(--secundary-highlighted-text-color)]"> $ ng serve </p>
    <br><br>

    <p class="text[var(--primary-font-color)]"> Instalar Back-end</p> <br>
    <p class="text-[var(--secundary-highlighted-text-color)]"> $ cd backend</p>
    <p class="text-[var(--secundary-highlighted-text-color)]"> $ sudo npm i -g @nestjs/cli</p>
    <p class="text-[var(--secundary-highlighted-text-color)]"> $ sudo npm install</p>
    <p class="text-[var(--secundary-highlighted-text-color)]"> $ npm run start:dev </p>
  </div>
</aside>`;

  contribuicao = `
  O projeto é aberto para receber novas contribuições! <br>
  Se você encontrar algum problema, pode abrir uma issue no GitHub é a maneira mais rápida de obter ajuda.<br> <br>
      Caso queira Contribuir:<br>
      • Crie um fork do repositório.<br>
      • Faça as alterações necessárias.<br>
      • Envie um pull request para análise.`;

  licenca = `Copyright <YEAR> <COPYRIGHT HOLDER>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software
and associated documentation files (the “Software”), to deal in the Software without restriction,
including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense,
and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:<br>

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.<br>

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
`;

  principaisFuncionalidade = `

  Cadastro e Autenticação de Usuários<br><br>

  O sistema permite que diferentes tipos de usuários (clientes, analistas e administradores) realizem o cadastro e autenticação segura. Durante o cadastro, são coletadas informações essenciais de cada usuário, como nome, e-mail, setor (para analistas) e empresa (para clientes). A autenticação utiliza tokens seguros para garantir o acesso exclusivo aos usuários registrados.
  Abertura de Tickets<br><br>

  A funcionalidade de abertura de tickets é acessível a todos os usuários.<br><br>
  Clientes podem abrir tickets para reportar problemas ou solicitar serviços, enquanto analistas e administradores têm permissões para registrar tickets em nome de clientes, se necessário. Ao abrir um ticket, o usuário insere informações detalhadas sobre o problema e pode anexar arquivos que auxiliem no diagnóstico e resolução. O sistema gera um número único para cada ticket, facilitando o rastreamento e a comunicação.
  <br><br>

  Fila de Tickets<br><br>

  A interface de fila de tickets exibe todos os tickets ativos, com visualização personalizada para cada tipo de usuário:<br>

  • Clientes: Veem apenas os tickets que abriram.<br>
  • Analistas: Têm acesso a todos os tickets atribuídos ao seu setor.<br>
  • Administradores: Podem ver todos os tickets do sistema.<br>

  A fila de tickets inclui opções para filtrar e pesquisar por status, prioridade,
  setor e data de criação. Além disso, há um botão para atualizar a lista de tickets e um botão
  de acesso rápido para os tickets já finalizados.<br><br>

  Adoção e Gerenciamento de Tickets<br><br>

  Adotar Ticket: Apenas analistas e administradores podem adotar um ticket.
  Essa função atribui o ticket ao analista, evitando duplicação de esforços e permitindo que
  o responsável se concentre na resolução do problema.<br>

  Gerenciar Ticket: Essa opção permite que analistas e administradores visualizem detalhes completos
  do ticket, incluindo o histórico de ações e anexos. Os usuários podem adicionar comentários,
  atualizar o status do ticket e modificar o nível de prioridade, quando necessário.<br>


  Em cada ticket, é registrado um histórico de todas as ações realizadas, como mudanças de status,
  atribuições, comentários e anexos adicionados. O histórico facilita a rastreabilidade e oferece uma
  visão completa do ciclo de vida do ticket, auxiliando analistas e administradores na gestão de incidentes.
  Notas e Anexos<br>

  Em cada ticket, existe uma aba de Notas para que analistas e clientes adicionem comentários,
  observações e sugestões. A aba de Anexos permite o upload de arquivos relevantes, como capturas de
  tela e documentos, para complementar a descrição do problema. Todos os anexos ficam disponíveis
  para visualização e download pelos usuários autorizados, otimizando a troca de informações.
  Relatórios e Métricas de Desempenho<br><br>

  Administradores têm acesso a uma seção de relatórios com métricas como taxa de resolução de tickets,
  número de tickets vencidos e finalizados, e o total de tickets abertos em um período específico.
  Essas métricas ajudam a avaliar a eficiência da equipe e a identificar áreas de melhoria no atendimento.

  `;

  tableItems: any = [
    {
      tipo: 'Urgente',
      urgente: 'Resposta: 10 minutos<br>Resolução: 30 minutos',
      mudanca: 'Resposta: 60 minutos<br>Resolução: 240 minutos',
      solicitacaoDeServico: 'Resposta: 15 minutos<br>Resolução: 30 minutos',
    },
    {
      tipo: 'Alta',
      urgente: 'Resposta: 30 minutos<br>Resolução: 60 minutos',
      mudanca: 'Resposta: 120 minutos<br>Resolução: 480 minutos',
      solicitacaoDeServico: 'Resposta: 30 minutos<br>Resolução: 60 minutos',
    },
    {
      tipo: 'Média',
      urgente: 'Resposta: 60 minutos<br>Resolução: 240 minutos',
      mudanca: 'Resposta: 120 minutos<br>Resolução: 720 minutos',
      solicitacaoDeServico: 'Resposta: 60 minutos<br>Resolução: 180 minutos',
    },
    {
      tipo: 'Normal',
      urgente: 'Resposta: 120 minutos<br>Resolução: 480 minutos',
      mudanca: 'Resposta: 240 minutos<br>Resolução: 1440 minutos',
      solicitacaoDeServico: 'Resposta: 180 minutos<br>Resolução: 1440 minutos',
    },
  ];
}
