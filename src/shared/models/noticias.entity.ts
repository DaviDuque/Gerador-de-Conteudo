import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { NoticiaOriginal } from './noticia-original.entity';
import { AssuntoNoticia } from './assunto-noticia.entity';

@Entity('noticias')
export class Noticias {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  id_noticia_original: number;

  @Column('text', { nullable: true })
  texto: string;

  @Column({ length: 255, nullable: true })
  manchete: string;

  @Column({ type: 'date', nullable: true })
  data_vinculo: Date;

  @Column()
  id_assunto: number;

  @Column({ length: 255, nullable: true })
  imagem: string;

  @Column({ length: 255, nullable: true })
  imagem_secundaria: string;

  @Column({ length: 255, nullable: true })
  video: string;

  @ManyToOne(() => NoticiaOriginal)
  @JoinColumn({ name: 'id_noticia_original' })
  noticiaOriginal: NoticiaOriginal;

  @ManyToOne(() => AssuntoNoticia)
  @JoinColumn({ name: 'id_assunto' })
  assuntoNoticia: AssuntoNoticia;
}
