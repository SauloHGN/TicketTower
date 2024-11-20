import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Sla } from 'src/entity/sla.entity';
import { DataUtilsService } from 'src/repository/DataUtils.service';
import { Repository } from 'typeorm';

@Injectable()
export class SlaService implements OnModuleInit {
  constructor(
    @InjectRepository(Sla)
    private readonly slaRepository: Repository<Sla>,

    private readonly dataUtilsService: DataUtilsService,
  ) {}

  async onModuleInit() {
    await this.populateDefaultSlas();
  }

  private async populateDefaultSlas() {
    // Verifica se já existem registros
    const existingSlas = await this.slaRepository.find();

    if (existingSlas.length === 0) {
      // Valores padrão para SLA
      const defaultSlas: Partial<Sla>[] = [
        {
          ticket_tipo: 'incidente',
          prioridade: 'urgente',
          tempo_resposta: 10,
          tempo_resolucao: 30,
        },
        {
          ticket_tipo: 'incidente',
          prioridade: 'alta',
          tempo_resposta: 30,
          tempo_resolucao: 60,
        },
        {
          ticket_tipo: 'incidente',
          prioridade: 'média',
          tempo_resposta: 60,
          tempo_resolucao: 240,
        },
        {
          ticket_tipo: 'incidente',
          prioridade: 'normal',
          tempo_resposta: 120,
          tempo_resolucao: 480,
        },

        // Mudanças
        {
          ticket_tipo: 'mudanca',
          prioridade: 'urgente',
          tempo_resposta: 60,
          tempo_resolucao: 240,
        },
        {
          ticket_tipo: 'mudanca',
          prioridade: 'alta',
          tempo_resposta: 120,
          tempo_resolucao: 480,
        },
        {
          ticket_tipo: 'mudanca',
          prioridade: 'média',
          tempo_resposta: 120,
          tempo_resolucao: 720,
        },
        {
          ticket_tipo: 'mudanca',
          prioridade: 'normal',
          tempo_resposta: 240,
          tempo_resolucao: 1440,
        },

        // Solicitações de Serviço
        {
          ticket_tipo: 'solicitacao_de_servico',
          prioridade: 'urgente',
          tempo_resposta: 15,
          tempo_resolucao: 30,
        },
        {
          ticket_tipo: 'solicitacao_de_servico',
          prioridade: 'alta',
          tempo_resposta: 30,
          tempo_resolucao: 60,
        },
        {
          ticket_tipo: 'solicitacao_de_servico',
          prioridade: 'média',
          tempo_resposta: 60,
          tempo_resolucao: 180,
        },
        {
          ticket_tipo: 'solicitacao_de_servico',
          prioridade: 'normal',
          tempo_resposta: 180,
          tempo_resolucao: 1440,
        },
      ];

      // Salva os registros padrão no banco
      await this.slaRepository.save(defaultSlas);
      console.log('SLA padrão populado com sucesso.');
    } else {
      console.log('Os dados de SLA já estão presentes na tabela.');
    }
  }

  async setSLA(userID: string, dadosSLA: any) {
    const permissao = await this.dataUtilsService.getRoleByID(userID);
    if (permissao && permissao !== 'cliente') {
      const camposNulos = Object.values(dadosSLA).some(
        (value) => value === null || value === '',
      );

      if (camposNulos) {
        return { status: 400, msg: 'Todos os campos devem ser preenchidos.' };
      }

      for (const tipo of ['incidente', 'mudanca', 'solicitacao_de_servico']) {
        const slas = dadosSLA[tipo];
        if (slas) {
          for (const prioridade of ['urgente', 'alta', 'média', 'normal']) {
            const tempoResposta = slas.resposta[prioridade];
            const tempoResolucao = slas.resolucao[prioridade];

            const slaExistente = await this.slaRepository.findOne({
              where: {
                ticket_tipo: tipo,
                prioridade: prioridade,
              },
            });

            if (slaExistente) {
              // Se o SLA existir, atualize os campos
              slaExistente.tempo_resposta = Number(tempoResposta);
              slaExistente.tempo_resolucao = Number(tempoResolucao);
              // Salvar as mudanças no banco
              await this.slaRepository.save(slaExistente);
            }
          }
        }
      }

      return { status: 200, msg: 'SLA atualizado com sucesso.' };
    }

    return {
      status: 403,
      msg: 'Permissão invalida ou usuário não encontrado.',
    };
  }

  async getLatestSlas(): Promise<ResponseSlaDto[]> {
    // Consulta para pegar os últimos SLAs para cada tipo
    // Query para pegar o último SLA de cada tipo e prioridade
    const slas = await this.slaRepository
      .createQueryBuilder('sla')
      .select([
        'sla.ticket_tipo',
        'sla.prioridade',
        'sla.tempo_resposta',
        'sla.tempo_resolucao',
        'sla.created_at',
      ])
      .where(
        'sla.created_at IN (SELECT MAX(created_at) FROM sla GROUP BY ticket_tipo, prioridade)',
      )
      .orderBy('sla.created_at', 'DESC')
      .getMany();

    // Organizar os dados no formato necessário
    const responseSlas = slas.map((sla) => ({
      tipo: sla.ticket_tipo,
      prioridade: sla.prioridade,
      tempoResposta: sla.tempo_resposta,
      tempoResolucao: sla.tempo_resolucao,
    }));

    return responseSlas;
  }
  async getSlaById(slaID: number) {
    return await this.slaRepository.findOne({
      where: { id: slaID },
    });
  }
}

export class ResponseSlaDto {
  tipo: string;
  prioridade: string;
  tempoResposta: number;
  tempoResolucao: number;
}
