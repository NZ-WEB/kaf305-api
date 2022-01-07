import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserEntity } from '@app/user/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { MembersEntity } from '@app/members/members.entity';
import { DeleteResult, Repository } from 'typeorm';
import { MembersDto } from '@app/members/dto/members.dto';
import { MembersResponseInterface } from '@app/members/types/membersResponse.interface';
import slugify from 'slugify';

@Injectable()
export class MembersService {
  constructor(
    @InjectRepository(MembersEntity)
    private readonly membersRepository: Repository<MembersEntity>,
  ) {}

  async createMember(
    currentUser: UserEntity,
    membersDto: MembersDto,
  ): Promise<MembersEntity> {
    const members = new MembersEntity();
    Object.assign(members, membersDto);

    if (!members.publications) {
      members.publications = [];
    }

    members.slug = this.getSlug(membersDto.fullName);

    return await this.membersRepository.save(members);
  }

  async findBySlug(slug: string): Promise<MembersEntity> {
    return await this.membersRepository.findOne({ slug: slug });
  }

  async deleteMember(
    slug: string,
    currentUserId: number,
  ): Promise<DeleteResult> {
    const members = await this.findBySlug(slug);

    if (!members) {
      throw new HttpException(
        'Работник кафедры не найден',
        HttpStatus.NOT_FOUND,
      );
    }

    return await this.membersRepository.delete({ slug });
  }

  async updateMember(
    membersDto: MembersDto,
    slug: string,
  ): Promise<MembersEntity> {
    const members = await this.findBySlug(slug);

    if (!members) {
      throw new HttpException('members does not exist', HttpStatus.NOT_FOUND);
    }

    Object.assign(members, membersDto);

    return this.membersRepository.save(members);
  }

  async buildMembersResponse(
    members: MembersEntity,
  ): Promise<MembersResponseInterface> {
    return { members };
  }

  private getSlug(title: string): string {
    return (
      slugify(title, { lower: true }) +
      '-' +
      ((Math.random() * Math.pow(36, 6)) | 0).toString() // Приписываем рандрмные символы
    );
  }
}
