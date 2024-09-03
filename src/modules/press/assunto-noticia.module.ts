
import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AssuntoNoticiaService } from './assunto-noticia.service';
import { AssuntoNoticiaController } from './assunto-noticia.controller';
import { AssuntoNoticia } from '../../shared/models/assunto-noticia.entity';
import { AuthMiddleware } from '../../common/decorators/auth.middleware';  // Importe o middleware de autenticação


@Module({
  imports: [TypeOrmModule.forFeature([AssuntoNoticia])],
  providers: [AssuntoNoticiaService],
  controllers: [AssuntoNoticiaController],
})
export class AssuntoNoticiaModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)  // Aplica o middleware de autenticação
      .forRoutes(AssuntoNoticiaController);  // Aplica para todas as rotas do controlador
  }
}
