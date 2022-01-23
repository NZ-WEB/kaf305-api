import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserEntity } from '@app/user/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { MembersEntity } from '@app/members/members.entity';
import { DeleteResult, getRepository, Repository } from 'typeorm';
import { MembersDto } from '@app/members/dto/members.dto';
import { MemberResponseInterface } from '@app/members/types/memberResponse.interface';
import slugify from 'slugify';
import { MembersResponseInterface } from '@app/members/types/membersResponse.interface';

@Injectable()
export class MembersService {
  constructor(
    @InjectRepository(MembersEntity)
    private readonly membersRepository: Repository<MembersEntity>,
    @InjectRepository(MembersEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async findAll(query: any): Promise<MembersResponseInterface> {
    const queryBuilder = getRepository(MembersEntity).createQueryBuilder(
      'members',
    );

    const membersCount = await queryBuilder.getCount();

    if (query.tag) {
      queryBuilder.andWhere('members.tagList LIKE :tag', {
        tag: `%${query.tag}%`,
      });
    }

    if (query.limit) {
      queryBuilder.limit(query.limit);
    }

    if (query.offset) {
      queryBuilder.offset(query.offset);
    }

    const members = await queryBuilder.getMany();

    return { members, membersCount };
  }
  async createMember(
    currentUser: UserEntity,
    membersDto: MembersDto,
  ): Promise<MembersEntity> {
    const member = new MembersEntity();
    Object.assign(member, membersDto);

    if (!member.publications) {
      member.publications = [];
    }

    member.slug = this.getSlug(membersDto.fullName);

    return await this.membersRepository.save(member);
  }

  async findBySlug(slug: string): Promise<MembersEntity> {
    return await this.membersRepository.findOne({ slug: slug });
  }

  async deleteMember(slug: string): Promise<DeleteResult> {
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
  ): Promise<MemberResponseInterface> {
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
