import { Module, MiddlewareConsumer } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrigemNoticia } from '../../shared/models/origem-noticia.entity';
import { OrigemNoticiaService } from './origem-noticia.service';
import { OrigemNoticiaController } from './origem-noticia.controller';
import { AuthMiddleware } from '../../common/decorators/auth.middleware';

@Module({
  imports: [TypeOrmModule.forFeature([OrigemNoticia])],
  controllers: [OrigemNoticiaController],
  providers: [OrigemNoticiaService],
})
export class OrigemNoticiaModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware) 
      .forRoutes(OrigemNoticiaController); 
  }
}






