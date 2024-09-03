
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { AssuntoNoticia } from '../../shared/models/assunto-noticia.entity';

@Injectable()
export class AssuntoNoticiaService {
  constructor(
    @InjectRepository(AssuntoNoticia)
    private assuntoNoticiaRepository: Repository<AssuntoNoticia>,
  ) {}
  

  findAll(): Promise<AssuntoNoticia[]> {
    return this.assuntoNoticiaRepository.find();
  }

  findOne(id: number): Promise<AssuntoNoticia> {
    return this.assuntoNoticiaRepository.findOne({ where: { id } });
  }

  create(assuntoNoticia: AssuntoNoticia): Promise<AssuntoNoticia> {
    return this.assuntoNoticiaRepository.save(assuntoNoticia);
  }

  async update(id: number, assuntoNoticia: AssuntoNoticia): Promise<AssuntoNoticia> {
    await this.assuntoNoticiaRepository.update(id, assuntoNoticia);
    return this.assuntoNoticiaRepository.findOne({ where: { id } });
  }

  async remove(id: number): Promise<void> {
    await this.assuntoNoticiaRepository.delete(id);
  }
}

