import { Module } from '@nestjs/common';
import { MembersController } from './members.controller';
import { MembersService } from './members.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MembersEntity } from '@app/members/members.entity';
import { UserEntity } from '@app/user/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MembersEntity, UserEntity])],
  controllers: [MembersController],
  providers: [MembersService],
})
export class MembersModule {}
