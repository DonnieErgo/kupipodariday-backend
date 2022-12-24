import { Module } from '@nestjs/common';
import { OffersService } from './offers.service';
import { OffersController } from './offers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Offer } from './entities/offer.entity';
import { User } from '../users/entities/user.entity';
import { Wish } from '../wishes/entities/wish.entity';
import { WishesModule } from '../wishes/wishes.module';

@Module({
  imports: [TypeOrmModule.forFeature([Offer, User, Wish]), WishesModule],
  controllers: [OffersController],
  providers: [OffersService],
})
export class OffersModule {}
