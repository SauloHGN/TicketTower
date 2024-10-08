import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Setores } from 'src/entity/setores.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SetoresService {
  constructor(
    @InjectRepository(Setores)
    private readonly setorRepository: Repository<Setores>,
  ) {}

  async findAll(): Promise<Setores[]> {
    return await this.setorRepository.find();
  }

  async getSetorByID(setorID: number): Promise<Setores | null> {
    return await this.setorRepository.findOne({ where: { id: setorID } });
  }
}
