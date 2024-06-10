import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Empresas } from 'src/entity/empresas.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EmpresasService {
  constructor(
    @InjectRepository(Empresas)
    private readonly empresaRepository: Repository<Empresas>,
  ) {}

  async findAll(): Promise<{ id: number; nome: string }[]> {
    const empresas = await this.empresaRepository.find({
      select: ['id', 'nome'],
    });
    return empresas.map((empresa) => ({ id: empresa.id, nome: empresa.nome }));
  }
}
