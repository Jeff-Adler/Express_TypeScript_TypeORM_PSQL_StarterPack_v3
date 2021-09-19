import { Expose } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';

export class findUsersQueryParamsDto {
  @Expose()
  @IsNumber()
  @IsOptional()
  skip!: string;

  @Expose()
  @IsNumber()
  @IsOptional()
  limit!: string;

  //TODO: add custom validator
  @Expose()
  @IsOptional()
  sortBy!: string;
}
