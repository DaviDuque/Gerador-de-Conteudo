import { Controller, Post, Param, Get } from '@nestjs/common';
import { IntelligenceService } from './intelligence.service';
import { Noticias } from '../../shared/models/noticias.entity';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Intelligence') 
@Controller('intelligence')

export class IntelligenceController {
  constructor(private readonly intelligenceService: IntelligenceService) {}

  @ApiOperation({ summary: 'Gerar notícia a partir de uma notícia original' })
  @ApiResponse({ status: 201, description: 'Notícia gerada com sucesso.', type: Noticias })
  @ApiResponse({ status: 404, description: 'Notícia original não encontrada.' })
  @Post('/generate/:id')
  generateFromOriginal(@Param('id') id: number): Promise<Noticias> {
    return this.intelligenceService.generateNewsFromOriginal(id);
  }

  @ApiOperation({ summary: 'Gerar notícias para todas as notícias originais pendentes' })
  @ApiResponse({ status: 201, description: 'Notícias geradas com sucesso.', type: [Noticias] })
  @Get('/generate-all')
  generateForAllPending(): Promise<Noticias[]> {
    return this.intelligenceService.generateNewsForAllPending();
  }
}


