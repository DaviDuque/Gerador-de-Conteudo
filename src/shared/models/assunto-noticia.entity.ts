import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('assunto_noticia')
export class AssuntoNoticia {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  nome: string;

  @Column({ length: 255 })
  nivel_de_atuacao: string;
}
