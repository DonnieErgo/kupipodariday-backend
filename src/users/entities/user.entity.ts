import {
  IsEmail,
  IsNotEmpty,
  IsEmpty,
  IsOptional,
  IsFQDN,
  Length,
  MinLength,
  MaxLength,
} from 'class-validator';
import { Entity, Column, OneToMany, BeforeInsert, BeforeUpdate } from 'typeorm';
import { Wish } from '../../wishes/entities/wish.entity';
import { Wishlist } from '../../wishlists/entities/wishlist.entity';
import { Offer } from '../../offers/entities/offer.entity';
import { DefaultEntity } from '../../utils/DefautEntity';
import { hash } from '../../utils/helpers';
import { Exclude } from 'class-transformer';

@Entity()
export class User extends DefaultEntity {
  @Column({ unique: true })
  @IsNotEmpty()
  @Length(2, 30, { message: 'Может быть от 2 до 30 символов' })
  username: string;

  @Column({ default: 'Пока ничего не рассказал о себе' })
  @IsOptional()
  @MaxLength(200, { message: 'Максимум 200 символов' })
  about: string;

  @Column({ default: 'https://i.pravatar.cc/300' })
  @IsFQDN()
  @IsOptional()
  avatar: string;

  @Column({ unique: true })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @Exclude()
  @Column()
  @IsNotEmpty()
  @MinLength(6, { message: 'Минимум 6 символов' })
  password: string;

  @IsEmpty()
  @OneToMany(() => Wish, (wish) => wish.owner)
  wishes: Wish[];

  @IsEmpty()
  @OneToMany(() => Offer, (offer) => offer.user)
  offers: Offer[];

  @IsEmpty()
  @OneToMany(() => Wishlist, (wishlist) => wishlist.owner)
  wishlists: Wishlist[];

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    if (this.password) {
      this.password = await hash(this.password, 10);
    }
  }
}
