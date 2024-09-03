import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AssuntoNoticiaModule } from './modules/press/assunto-noticia.module';
import { OrigemNoticiaModule } from './modules/press/origem-noticia.module';
import { NoticiaOriginalModule } from './modules/press/noticia-original.module';
import { NoticiasModule } from './modules/press/noticias.module';
import { DatabaseModule } from './database/database.module';
import { IntelligenceModule } from './modules/intelligence/intelligence.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Faz o módulo de configuração estar disponível globalmente
    }),
    DatabaseModule,
    AssuntoNoticiaModule,
    OrigemNoticiaModule,
    NoticiaOriginalModule,
    NoticiasModule,
    IntelligenceModule
  ],
  //providers: [ControlConnectionService],
})
export class AppModule {}

