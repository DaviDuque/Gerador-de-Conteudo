import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NoticiaOriginal } from '../../shared/models/noticia-original.entity';
import { NoticiaOriginalService } from './noticia-original.service';
import { NoticiaOriginalController } from './noticia-original.controller';

@Module({
  imports: [TypeOrmModule.forFeature([NoticiaOriginal])],
  providers: [NoticiaOriginalService],
  controllers: [NoticiaOriginalController],
})
export class NoticiaOriginalModule {}
