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
import { AuthGuard } from '@app/user/guards/auth.guard';
import { CreatePublicationDto } from '@app/publications/dto/CreatePublication.dto';
import { PublicationsService } from '@app/publications/publications.service';
import { PublicationResponseInterface } from '@app/publications/types/PublicationResponse.interface';
import { PublicationsResponseInterface } from '@app/publications/types/PublicationsResponse.interface';
import { User } from '@app/user/decorators/user.decorator';
import { DeleteResult } from 'typeorm';
import { UpdatePublicationDto } from '@app/publications/dto/UpdatePublication.dto';

@Controller('publications')
export class PublicationsController {
  constructor(private readonly publicationService: PublicationsService) {}

  @Get()
  async findAll(@Query() query: any): Promise<PublicationsResponseInterface> {
    return await this.publicationService.findAll(query);
  }

  @Post()
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe())
  async create(
    @Body('publication') createPublicationDto: CreatePublicationDto,
  ): Promise<PublicationResponseInterface> {
    const publication = await this.publicationService.createPublication(
      createPublicationDto,
    );
    return this.publicationService.buildPublicationsResponse(publication);
  }

  @Delete(':slug')
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe())
  async deleteBySlug(
    @User('id') currentUserId: number,
    @Param('slug') slug: string,
  ): Promise<DeleteResult> {
    return await this.publicationService.deleteBySlug(slug);
  }

  @Put(':slug')
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe())
  async updatePublication(
    @Body('publication') publicationDto: UpdatePublicationDto,
    @Param('slug') slug: string,
  ): Promise<PublicationResponseInterface> {
    const publication = await this.publicationService.updatePublication(
      publicationDto,
      slug,
    );
    return await this.publicationService.buildPublicationsResponse(publication);
  }
}
