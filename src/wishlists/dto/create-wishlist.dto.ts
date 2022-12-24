import { IsNotEmpty, IsUrl, Length, IsOptional } from 'class-validator';

export class CreateWishlistDto {
  @IsNotEmpty()
  @Length(1, 250)
  name: string;

  @IsNotEmpty()
  @IsUrl()
  image: string;

  @IsOptional()
  @Length(1, 1500)
  description: string;

  @IsOptional()
  itemsId: number[];
}
