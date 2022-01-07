import { BeforeUpdate, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from '@app/user/user.entity';

@Entity()
export class MembersEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  slug: string;

  @Column({ default: '' })
  fullName: string;

  @Column({ default: '' })
  post: string;

  @Column({ default: '' })
  disciplines: string;

  @Column({ default: '' })
  education: string;

  @Column({ default: '' })
  qualification: string;

  @Column({ default: '' })
  academicDegree: string;

  @Column({ default: '' })
  specialties: string;

  @Column({ default: '' })
  advancedTraining: string;

  @Column({ default: '' })
  specGuardian: string;

  @Column({ default: '' })
  totalGuardian: string;

  @Column({ default: '' })
  avatar: string;

  // @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  // education: Date;
  //
  // @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  // updatedAt: Date;
  //
  // @BeforeUpdate()
  // updateTimestamp() {
  //   this.updatedAt = new Date();
  // }

  @Column('simple-array')
  publications: string[];

  // @ManyToOne(() => UserEntity, (user) => user.memberss, { eager: true })
  // author: UserEntity;
}
