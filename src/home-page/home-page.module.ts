import { Module } from '@nestjs/common';
import { HomePageController } from './home-page.controller';
import { HomePageService } from './home-page.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HomePageTopNewsEntity } from '@app/home-page/HomePageTopNews.entity';

@Module({
  imports: [TypeOrmModule.forFeature([HomePageTopNewsEntity])],
  controllers: [HomePageController],
  providers: [HomePageService],
})
export class HomePageModule {}
