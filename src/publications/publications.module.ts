import { Module } from '@nestjs/common';
import { PublicationsController } from './publications.controller';
import { PublicationsService } from './publications.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PublicationEntity } from '@app/publications/publication.entity';
import { MembersEntity } from '@app/members/members.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PublicationEntity, MembersEntity])],
  controllers: [PublicationsController],
  providers: [PublicationsService],
})
export class PublicationsModule {}
