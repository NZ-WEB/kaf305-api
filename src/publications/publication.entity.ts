import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'publications' })
export class PublicationEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  slug: string;

  @Column()
  title: string;

  @Column({ default: '' })
  body: string;

  @Column({ default: '' })
  published: string;
}
