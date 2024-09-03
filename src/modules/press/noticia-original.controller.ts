import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { NoticiaOriginalService } from './noticia-original.service';
import { NoticiaOriginal } from '../../shared/models/noticia-original.entity';

@Controller('noticia-original')
export class NoticiaOriginalController {
  constructor(private readonly noticiaOriginalService: NoticiaOriginalService) {}

  @Get()
  findAll(): Promise<NoticiaOriginal[]> {
    return this.noticiaOriginalService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<NoticiaOriginal> {
    return this.noticiaOriginalService.findOne(id);
  }

  @Post()
  create(@Body() noticiaOriginal: NoticiaOriginal): Promise<NoticiaOriginal> {
    return this.noticiaOriginalService.create(noticiaOriginal);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() noticiaOriginal: NoticiaOriginal): Promise<NoticiaOriginal> {
    return this.noticiaOriginalService.update(id, noticiaOriginal);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.noticiaOriginalService.remove(id);
  }
}
