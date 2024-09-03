import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { OrigemNoticiaService } from './origem-noticia.service';
import { OrigemNoticia } from '../../shared/models/origem-noticia.entity';

@Controller('origem-noticia')
export class OrigemNoticiaController {
  constructor(private readonly origemNoticiaService: OrigemNoticiaService) {}

  @Get() 
  findAll(): Promise<OrigemNoticia[]> {
    return this.origemNoticiaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<OrigemNoticia> {
    return this.origemNoticiaService.findOne(id);
  }

  @Post()
  create(@Body() origemNoticia: OrigemNoticia): Promise<OrigemNoticia> {
    return this.origemNoticiaService.create(origemNoticia);
  }

  @Put(':id') 
  update(@Param('id') id: number, @Body() origemNoticia: OrigemNoticia): Promise<OrigemNoticia> {
    return this.origemNoticiaService.update(id, origemNoticia);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.origemNoticiaService.remove(id);
  }
}
