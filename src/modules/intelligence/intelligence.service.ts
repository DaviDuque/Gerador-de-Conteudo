import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Not } from 'typeorm';
import { NoticiaOriginal } from '../../shared/models/noticia-original.entity';
import { Noticias } from '../../shared/models/noticias.entity';
import { OpenAIService } from './openai.service';

@Injectable()
export class IntelligenceService {
  constructor(
    @InjectRepository(NoticiaOriginal)
    private noticiaOriginalRepository: Repository<NoticiaOriginal>,

    @InjectRepository(Noticias)
    private noticiasRepository: Repository<Noticias>,

    private openAIService: OpenAIService, 
  ) {}

  async generateNewsFromOriginal(id: number): Promise<Noticias> {
    const original = await this.noticiaOriginalRepository.findOne({
      where: { id },
      relations: ['origemNoticia', 'assuntoNoticia'],
    });

    if (!original) {
      throw new Error('Notícia original não encontrada');
    }

    if (original.publicacao === 'S') {
      throw new Error('Notícia original já foi publicada e não pode ser processada novamente.');
    }

    const { headline, content } = await this.openAIService.generateNewsContent(
      original.texto,
      original.origemNoticia.nome,
      original.assuntoNoticia.nivel_de_atuacao,
    );

    const noticia = new Noticias();
    noticia.id_noticia_original = original.id;
    noticia.texto = content;
    noticia.manchete = headline;
    noticia.data_vinculo = new Date();
    noticia.id_assunto = original.id_assunto;
    noticia.imagem = ''; 
    noticia.imagem_secundaria = '';
    noticia.video = '';

    const novaNoticia = await this.noticiasRepository.save(noticia);

    original.publicacao = 'S';
    await this.noticiaOriginalRepository.save(original);

    return novaNoticia;
  }

  async generateNewsForAllPending(): Promise<Noticias[]> {
    
    const pendingOriginals = await this.noticiaOriginalRepository.find({
      where: { publicacao: Not('S') },
      relations: ['origemNoticia', 'assuntoNoticia'],
    });

    const createdNews: Noticias[] = [];

    for (const original of pendingOriginals) {
      try {
        const { headline, content } = await this.openAIService.generateNewsContent(
          original.texto,
          original.origemNoticia.nome,
          original.assuntoNoticia.nivel_de_atuacao,
        );

        const noticia = new Noticias();
        noticia.id_noticia_original = original.id;
        noticia.texto = content;
        noticia.manchete = headline;
        noticia.data_vinculo = new Date();
        noticia.id_assunto = original.id_assunto;
        noticia.imagem = '';
        noticia.imagem_secundaria = '';
        noticia.video = '';

        const novaNoticia = await this.noticiasRepository.save(noticia);
        createdNews.push(novaNoticia);

        original.publicacao = 'S';
        await this.noticiaOriginalRepository.save(original);

      } catch (error) {
        console.error(`Erro ao processar a notícia original com ID ${original.id}: ${error.message}`);
      }
    }

    return createdNews;
  }
}
