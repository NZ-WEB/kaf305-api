import { IsNotEmpty } from 'class-validator';

export class TopNewsDto {
  @IsNotEmpty()
  readonly title: string;

  @IsNotEmpty()
  readonly text: string;

  @IsNotEmpty()
  readonly icon: string;
}
