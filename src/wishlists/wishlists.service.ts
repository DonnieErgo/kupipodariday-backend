import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';
import { Wishlist } from './entities/wishlist.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Wish } from '../wishes/entities/wish.entity';

@Injectable()
export class WishlistsService {
  constructor(
    @InjectRepository(Wishlist)
    private readonly wishlistsRepository: Repository<Wishlist>,
  ) {}

  async findAll(): Promise<Wishlist[]> {
    return this.wishlistsRepository.find({ relations: ['items', 'owner'] });
  }

  async create(
    user: User,
    createWishlistDto: CreateWishlistDto,
  ): Promise<Wishlist> {
    const { itemsId, ...rest } = createWishlistDto;
    const wishes = itemsId.map((id: number) => ({ id } as Wish));
    const wishlist = this.wishlistsRepository.create({
      ...rest,
      owner: user,
      items: wishes,
    });
    return this.wishlistsRepository.save(wishlist);
  }

  async findOneById(id: number): Promise<Wishlist> {
    return this.wishlistsRepository.findOne({
      where: { id },
      relations: ['items', 'owner'],
    });
  }

  async update(id: number, updateWishlistDto: UpdateWishlistDto) {
    return this.wishlistsRepository.update(id, updateWishlistDto);
  }

  async remove(id: number) {
    return this.wishlistsRepository.delete(id);
  }
}
