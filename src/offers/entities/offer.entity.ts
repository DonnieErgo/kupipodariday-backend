import { DefaultEntity } from '../../utils/DefautEntity';
import { Entity, Column, ManyToOne } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Wish } from '../../wishes/entities/wish.entity';
import { IsBoolean, IsNotEmpty, NotEquals } from 'class-validator';

@Entity()
export class Offer extends DefaultEntity {
  @ManyToOne(() => User, (user) => user.offers)
  @IsNotEmpty()
  user: User;

  @ManyToOne(() => Wish, (wish) => wish.offers)
  @IsNotEmpty()
  item: Wish;

  @Column({ scale: 2 })
  @IsNotEmpty()
  @NotEquals(0)
  amount: number;

  @Column({ default: false })
  @IsBoolean()
  hidden: boolean;
}
