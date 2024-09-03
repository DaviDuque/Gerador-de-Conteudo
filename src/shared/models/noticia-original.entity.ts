import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { AssuntoNoticia } from './assunto-noticia.entity';
import { OrigemNoticia } from './origem-noticia.entity';

@Entity('noticia_original')
export class NoticiaOriginal {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  id_origem_noticia: number;

  @Column({ length: 255, nullable: true })
  descricao: string;

  @Column('text', { nullable: true })
  texto: string;

  @Column({ length: 255, nullable: true })
  manchete: string;

  @Column({ length: 255, nullable: true })
  link: string;

  @Column()
  id_assunto: number;

  @Column({ type: 'date', nullable: true })
  data: Date;

  @Column({ type: 'char', length: 1, nullable: true })
  publicacao: string;

  @ManyToOne(() => OrigemNoticia)
  @JoinColumn({ name: 'id_origem_noticia' })
  origemNoticia: OrigemNoticia;

  @ManyToOne(() => AssuntoNoticia)
  @JoinColumn({ name: 'id_assunto' })
  assuntoNoticia: AssuntoNoticia;
}
