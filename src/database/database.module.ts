import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AssuntoNoticia } from '../shared/models/assunto-noticia.entity';
import { OrigemNoticia } from '../shared/models/origem-noticia.entity';
import { NoticiaOriginal } from '../shared/models/noticia-original.entity';
import { Noticias } from '../shared/models/noticias.entity';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Torna o módulo de configuração globalmente disponível
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DATABASE_HOST'),
        port: configService.get<number>('DATABASE_PORT') || 5432,
        username: configService.get<string>('DATABASE_USER'),
        password: configService.get<string>('DATABASE_PASSWORD'),
        database: configService.get<string>('DATABASE_NAME') || 'controle',
        entities: [AssuntoNoticia, OrigemNoticia, NoticiaOriginal, Noticias],
        autoLoadEntities: true,
        synchronize: true,
      }),
    }),
    // Conexão ao banco 'imprensa'
    /*TypeOrmModule.forRootAsync({
      name: 'imprensaConnection',
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('IMPRENSA_DATABASE_HOST') || 'mysql.sa-east-1.rds.amazonaws.com',
        port: configService.get<number>('IMPRENSA_DATABASE_PORT') || 5432,
        username: configService.get<string>('IMPRENSA_DATABASE_USER'),
        password: configService.get<string>('IMPRENSA_DATABASE_PASSWORD'),
        database: configService.get<string>('IMPRENSA_DATABASE_NAME'),
        entities: [Fluxo, Materia],
        autoLoadEntities: true,
        synchronize: true,
      }),
    }),*/
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}

