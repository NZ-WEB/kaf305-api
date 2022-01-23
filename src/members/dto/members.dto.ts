import { IsNotEmpty } from 'class-validator';

export class MembersDto {
  @IsNotEmpty()
  readonly fullName: string;

  @IsNotEmpty()
  readonly post: string;

  @IsNotEmpty()
  readonly disciplines: string;

  @IsNotEmpty()
  readonly education: string;

  @IsNotEmpty()
  readonly qualification: string;

  @IsNotEmpty()
  readonly academicDegree: string;

  @IsNotEmpty()
  readonly specialties: string;

  @IsNotEmpty()
  readonly advancedTraining: string;

  @IsNotEmpty()
  readonly specGuardian: string;

  @IsNotEmpty()
  readonly totalGuardian: string;

  @IsNotEmpty()
  readonly avatar: string;

  readonly publications?: string[];
}
