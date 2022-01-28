import {
  Body,
  Controller,
  Get,
  Post,
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
    @Body('publications') createPublicationDto: CreatePublicationDto,
  ): Promise<PublicationResponseInterface> {
    const publication = await this.publicationService.createPublication(
      createPublicationDto,
    );
    return this.publicationService.buildPublicationsResponse(publication);
  }
}
