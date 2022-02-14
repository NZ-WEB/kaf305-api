import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { HomePageService } from '@app/home-page/home-page.service';
import { AuthGuard } from '@app/user/guards/auth.guard';
import { User } from '@app/user/decorators/user.decorator';
import { UserEntity } from '@app/user/user.entity';
import { TopNewsDto } from '@app/home-page/dto/topNews.dto';
import { TopNewsResponseInterface } from '@app/home-page/types/TopNewsResponse.interface';
import { HomePageTopNewsEntity } from '@app/home-page/HomePageTopNews.entity';
import { DeleteResult } from 'typeorm';

@Controller('home-page')
export class HomePageController {
  constructor(private readonly homePageService: HomePageService) {}

  @Get('/news')
  async findAll(
    @User('id') currentUserId: number,
    @Query() query: any,
  ): Promise<{ allTopNews: HomePageTopNewsEntity[]; topNewsCount: number }> {
    return await this.homePageService.findAll(query);
  }

  @Post('/news')
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe())
  async createTopNews(
    @User() currentUser: UserEntity,
    @Body('news') topNewsDto: TopNewsDto,
  ): Promise<TopNewsResponseInterface> {
    const news = await this.homePageService.createNews(currentUser, topNewsDto);
    return this.homePageService.buildTopNewsResponse(news);
  }

  @Delete('/news/:id')
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe())
  async deleteById(
    @User('id') currentUserId: number,
    @Param('id') id: number,
  ): Promise<DeleteResult> {
    return await this.homePageService.deleteById(id);
  }

  @Put('/news/:id')
  @UseGuards(AuthGuard)
  async updateMember(
    @Body('news') newsDto: TopNewsDto,
    @Param('id') id: number,
  ): Promise<TopNewsResponseInterface> {
    const news = await this.homePageService.updateNews(newsDto, id);
    return await this.homePageService.buildTopNewsResponse(news);
  }
}
