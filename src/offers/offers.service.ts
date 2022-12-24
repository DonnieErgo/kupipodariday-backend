import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateOfferDto } from './dto/create-offer.dto';
import { Offer } from './entities/offer.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WishesService } from '../wishes/wishes.service';
import { User } from '../users/entities/user.entity';

@Injectable()
export class OffersService {
  constructor(
    @InjectRepository(Offer)
    private readonly offersRepository: Repository<Offer>,
    private readonly wishesService: WishesService,
  ) {}

  async findOneById(id: number): Promise<Offer> {
    return this.offersRepository.findOne({
      where: { id },
      relations: ['item', 'user'],
    });
  }

  async findAll(): Promise<Offer[]> {
    return this.offersRepository.find({ relations: ['item', 'user'] });
  }

  async create(user: User, createOfferDto: CreateOfferDto) {
    const wishes = await this.wishesService.findOneById(createOfferDto.itemId);
    if (createOfferDto.amount < 0) {
      throw new BadRequestException('Должно быть больше 0');
    } else if (user.id === wishes.owner.id) {
      throw new BadRequestException(
        'Нельзя вносить деньги на собственные подарки',
      );
    } else if (createOfferDto.amount > wishes.price - wishes.raised) {
      throw new BadRequestException(
        'Сумма собранных средств не может превышать стоимость подарка',
      );
    }
    await this.wishesService.update(createOfferDto.itemId, {
      raised: wishes.raised + createOfferDto.amount,
    });
    const wish = await this.wishesService.findOneById(wishes.id);

    return this.offersRepository.save({ ...createOfferDto, user, item: wish });
  }
}
