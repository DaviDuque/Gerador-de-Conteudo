import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('origem_noticia')
export class OrigemNoticia {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  nome: string;

  @Column({ length: 255 })
  nivel_de_atuacao: string;
}
