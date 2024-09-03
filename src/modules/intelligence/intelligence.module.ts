import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IntelligenceService } from './intelligence.service';
import { IntelligenceController } from './intelligence.controller';
import { OpenAIService } from './openai.service';
import { NoticiaOriginal } from '../../shared/models/noticia-original.entity';
import { Noticias } from '../../shared/models/noticias.entity';

@Module({
  imports: [TypeOrmModule.forFeature([NoticiaOriginal, Noticias])], 
  providers: [IntelligenceService, OpenAIService],
  controllers: [IntelligenceController], 
})
export class IntelligenceModule {}
