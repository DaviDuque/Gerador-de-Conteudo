import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { AssuntoNoticiaService } from './assunto-noticia.service';
import { AssuntoNoticia } from '../../shared/models/assunto-noticia.entity';

@Controller('assunto-noticia')
export class AssuntoNoticiaController {
  constructor(private readonly assuntoNoticiaService: AssuntoNoticiaService) {}

  @Get()
  findAll(): Promise<AssuntoNoticia[]> {
    return this.assuntoNoticiaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<AssuntoNoticia> {
    return this.assuntoNoticiaService.findOne(id);
  }

  @Post()
  create(@Body() assuntoNoticia: AssuntoNoticia): Promise<AssuntoNoticia> {
    return this.assuntoNoticiaService.create(assuntoNoticia);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() assuntoNoticia: AssuntoNoticia): Promise<AssuntoNoticia> {
    return this.assuntoNoticiaService.update(id, assuntoNoticia);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.assuntoNoticiaService.remove(id);
  }
}
