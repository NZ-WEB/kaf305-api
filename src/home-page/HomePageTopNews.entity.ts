import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class HomePageTopNewsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: '' })
  title: string;

  @Column({ default: '' })
  text: string;

  @Column({ default: '' })
  icon: string;
}
