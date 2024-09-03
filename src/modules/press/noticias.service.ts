import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Noticias } from '../../shared/models/noticias.entity';

@Injectable()
export class NoticiasService {
  constructor(
    @InjectRepository(Noticias)
    private noticiasRepository: Repository<Noticias>,
  ) {}

  findAll(): Promise<Noticias[]> {
    return this.noticiasRepository.find({ relations: ['noticiaOriginal', 'assuntoNoticia'] });
  }

  findOne(id: number): Promise<Noticias> {
    return this.noticiasRepository.findOne({ where: { id }, relations: ['noticiaOriginal', 'assuntoNoticia'] });
  }

  create(noticias: Noticias): Promise<Noticias> {
    return this.noticiasRepository.save(noticias);
  }

  async update(id: number, noticias: Noticias): Promise<Noticias> {
    await this.noticiasRepository.update(id, noticias);
    return this.noticiasRepository.findOne({ where: { id } });
  }

  async remove(id: number): Promise<void> {
    await this.noticiasRepository.delete(id);
  }
}




