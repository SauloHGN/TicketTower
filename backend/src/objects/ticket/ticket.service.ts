import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Funcionarios } from 'src/entity/funcionarios.entity';
import { Mensagens } from 'src/entity/mensagens.entity';
import { Tickets } from 'src/entity/ticket.entity';
import { FuncionarioService } from 'src/users/funcionario/funcionario.service';
import { Repository } from 'typeorm';

@Injectable()
export class TicketService {
  constructor(
    @InjectRepository(Tickets)
    private readonly ticketRepository: Repository<Tickets>,

    private readonly funcionarioService: FuncionarioService,
  ) {}

  async loadData(id: string, permissao: string) {
    if (permissao == 'funcionario') {
      const funcionario = await this.funcionarioService.getSetorByID(id);
      const tickets = await this.ticketRepository
        .createQueryBuilder('ticket')
        .innerJoin('ticket.id_setor', 'setor') // Juntando com a entidade Setores
        .where('setor.id = :setorId', { setorId: funcionario.setor }) // Comparando com o setor do funcionário
        .getMany();

      return {
        status: 200,
        tickets: tickets,
      };
    }

    if (permissao == 'cliente') {
      const tickets = await this.ticketRepository.find({
        where: { aberto_por: id }, // Ajuste conforme seu modelo
      });

      return { status: 200, tickets: tickets };
    }

    if (permissao == 'administrador') {
      const tickets = await this.ticketRepository.find();

      return { status: 200, tickets: tickets };
    }

    return {
      status: 404,
      mensagem: 'Permissao não conhecida',
      tickets: null,
    };
  }
}
