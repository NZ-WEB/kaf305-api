import { Module } from '@nestjs/common';
import { MembersController } from './members.controller';
import { MembersService } from './members.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MembersEntity } from '@app/members/members.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MembersEntity])],
  controllers: [MembersController],
  providers: [MembersService],
})
export class MembersModule {}
