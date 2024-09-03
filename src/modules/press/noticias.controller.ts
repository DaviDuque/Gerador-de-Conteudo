import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { NoticiasService } from './noticias.service';
import { Noticias } from '../../shared/models/noticias.entity';

@Controller('noticias')
export class NoticiasController {
  constructor(private readonly noticiasService: NoticiasService) {}

  @Get()
  findAll(): Promise<Noticias[]> {
    return this.noticiasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Noticias> {
    return this.noticiasService.findOne(id);
  }

  @Post()
  create(@Body() noticias: Noticias): Promise<Noticias> {
    return this.noticiasService.create(noticias);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() noticias: Noticias): Promise<Noticias> {
    return this.noticiasService.update(id, noticias);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.noticiasService.remove(id);
  }
}
