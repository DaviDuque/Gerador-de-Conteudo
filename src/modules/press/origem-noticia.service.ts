import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrigemNoticia } from '../../shared/models/origem-noticia.entity';

@Injectable()
export class OrigemNoticiaService {
  constructor(
    @InjectRepository(OrigemNoticia)
    private origemNoticiaRepository: Repository<OrigemNoticia>,
  ) {}

  findAll(): Promise<OrigemNoticia[]> {
    return this.origemNoticiaRepository.find();
  }

  findOne(id: number): Promise<OrigemNoticia> {
    return this.origemNoticiaRepository.findOneBy({ id });
  }

  create(origemNoticia: OrigemNoticia): Promise<OrigemNoticia> {
    return this.origemNoticiaRepository.save(origemNoticia);
  }

  async update(id: number, origemNoticia: OrigemNoticia): Promise<OrigemNoticia> {
    await this.origemNoticiaRepository.update(id, origemNoticia);
    return this.origemNoticiaRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.origemNoticiaRepository.delete(id);
  }
}
