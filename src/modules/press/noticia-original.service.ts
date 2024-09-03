import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NoticiaOriginal } from '../../shared/models/noticia-original.entity';

@Injectable()
export class NoticiaOriginalService {
  constructor(
    @InjectRepository(NoticiaOriginal)
    private noticiaOriginalRepository: Repository<NoticiaOriginal>,
  ) {}

  findAll(): Promise<NoticiaOriginal[]> {
    return this.noticiaOriginalRepository.find({ relations: ['origemNoticia', 'assuntoNoticia'] });
  }

  findOne(id: number): Promise<NoticiaOriginal> {
    return this.noticiaOriginalRepository.findOne({ where: { id }, relations: ['origemNoticia', 'assuntoNoticia'] });
  }

  create(noticiaOriginal: NoticiaOriginal): Promise<NoticiaOriginal> {
    return this.noticiaOriginalRepository.save(noticiaOriginal);
  }

  async update(id: number, noticiaOriginal: NoticiaOriginal): Promise<NoticiaOriginal> {
    await this.noticiaOriginalRepository.update(id, noticiaOriginal);
    return this.noticiaOriginalRepository.findOne({ where: { id } });
  }

  async remove(id: number): Promise<void> {
    await this.noticiaOriginalRepository.delete(id);
  }
}
