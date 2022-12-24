import { IsBoolean, IsNotEmpty, IsOptional, NotEquals } from 'class-validator';

export class CreateOfferDto {
  @IsNotEmpty()
  @NotEquals(0)
  amount: number;

  @IsOptional()
  @IsBoolean()
  hidden: boolean;

  @IsNotEmpty()
  itemId: number;
}
