import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Noticias } from '../../shared/models/noticias.entity';
import { NoticiasService } from './noticias.service';
import { NoticiasController } from './noticias.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Noticias])],
  providers: [NoticiasService],
  controllers: [NoticiasController],
})
export class NoticiasModule {}
