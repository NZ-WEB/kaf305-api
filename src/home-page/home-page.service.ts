import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, getRepository, Repository } from 'typeorm';
import { HomePageTopNewsEntity } from '@app/home-page/HomePageTopNews.entity';
import { UserEntity } from '@app/user/user.entity';
import { TopNewsDto } from '@app/home-page/dto/topNews.dto';
import { TopNewsResponseInterface } from '@app/home-page/types/TopNewsResponse.interface';
import { AllTopNewsResponseInterface } from '@app/home-page/types/AllTopNewsResponse.interface';

@Injectable()
export class HomePageService {
  constructor(
    @InjectRepository(HomePageTopNewsEntity)
    private readonly topNewsRepository: Repository<HomePageTopNewsEntity>,
  ) {}

  async findAll(
    query: any,
  ): Promise<{ allTopNews: HomePageTopNewsEntity[]; topNewsCount: number }> {
    const queryBuilder = getRepository(
      HomePageTopNewsEntity,
    ).createQueryBuilder('topNews');

    const topNewsCount = await queryBuilder.getCount();

    if (query.limit) {
      queryBuilder.limit(query.limit);
    }

    if (query.offset) {
      queryBuilder.offset(query.offset);
    }

    const allTopNews = await queryBuilder.getMany();

    return { allTopNews, topNewsCount };
  }

  async createNews(
    currentUser: UserEntity,
    topNewsDto: TopNewsDto,
  ): Promise<HomePageTopNewsEntity> {
    const news = new HomePageTopNewsEntity();
    Object.assign(news, topNewsDto);

    return await this.topNewsRepository.save(news);
  }

  async deleteById(id: number): Promise<DeleteResult> {
    const news = await this.findById(id);

    if (!news) {
      throw new HttpException(
        'Работник кафедры не найден',
        HttpStatus.NOT_FOUND,
      );
    }

    return await this.topNewsRepository.delete({ id });
  }

  async findById(inputId: number): Promise<HomePageTopNewsEntity> {
    const { id } = await this.topNewsRepository.findOne({ id: inputId });

    if (!id) {
      throw new HttpException(
        'Новость с таким ID не найдена',
        HttpStatus.NOT_FOUND,
      );
    }

    return await this.topNewsRepository.findOne(id);
  }

  async updateNews(
    newsDto: TopNewsDto,
    id: number,
  ): Promise<HomePageTopNewsEntity> {
    const news = await this.findById(id);

    if (!news) {
      throw new HttpException(
        'Такой новости не существует',
        HttpStatus.NOT_FOUND,
      );
    }

    Object.assign(news, newsDto);
    return this.topNewsRepository.save(news);
  }

  async buildTopNewsResponse(
    topNews: HomePageTopNewsEntity,
  ): Promise<TopNewsResponseInterface> {
    return { topNews };
  }

  async buildAllTopNewsResponse(
    allTopNews: HomePageTopNewsEntity[],
  ): Promise<AllTopNewsResponseInterface> {
    return { allTopNews };
  }
}
