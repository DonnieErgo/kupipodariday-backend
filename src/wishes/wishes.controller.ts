import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
  ForbiddenException,
  Delete,
} from '@nestjs/common';
import { WishesService } from './wishes.service';
import { Wish } from './entities/wish.entity';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { CreateWishDto } from './dto/create-wish.dto';
import { UpdateWishDto } from './dto/update-wish.dto';

@Controller('wishes')
export class WishesController {
  constructor(private readonly wishesService: WishesService) {}

  @Get('last')
  async findLastWishes(): Promise<Wish[]> {
    return await this.wishesService.findLastWishes();
  }

  @Get('top')
  async findTopWishes(): Promise<Wish[]> {
    return await this.wishesService.findTopWishes();
  }

  @UseGuards(JwtGuard)
  @Post()
  create(@Req() req, @Body() createWishDto: CreateWishDto): Promise<Wish> {
    return this.wishesService.create(req.user, createWishDto);
  }

  @UseGuards(JwtGuard)
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Wish> {
    return await this.wishesService.findOneById(id);
  }

  @UseGuards(JwtGuard)
  @Patch(':id')
  async updateWish(
    @Req() req,
    @Param('id') id: number,
    @Body() updateWishDto: UpdateWishDto,
  ) {
    const wish = await this.wishesService.findOneById(id);
    if (req.user.id === wish.owner.id) {
      return await this.wishesService.update(id, updateWishDto);
    } else {
      throw new ForbiddenException();
    }
  }

  @UseGuards(JwtGuard)
  @Delete(':id')
  async deleteWish(@Req() req, @Param('id') id: number): Promise<Wish> {
    const wish = await this.wishesService.findOneById(id);
    if (req.user.id === wish.owner.id) {
      await this.wishesService.remove(id);
      return wish;
    } else {
      throw new ForbiddenException();
    }
  }
}
