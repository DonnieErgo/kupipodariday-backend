import {
  Controller,
  Get,
  Param,
  Req,
  UseGuards,
  NotFoundException,
  Post,
  Body,
  Patch,
  UseInterceptors,
} from '@nestjs/common';
import { Wish } from '../wishes/entities/wish.entity';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { WishesService } from '../wishes/wishes.service';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdateResult } from 'typeorm';
import { TransformInterceptor } from '../utils/transform.interceptor';

@UseGuards(JwtGuard)
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly wishesService: WishesService,
  ) {}

  @UseInterceptors(TransformInterceptor)
  @Get('me')
  async getMyUser(@Req() req): Promise<User> {
    return this.usersService.findOneById(req.user.id);
  }

  @Get('me/wishes')
  async getMyWishes(@Req() req): Promise<Wish[]> {
    return this.wishesService.findManyByOwner(req.user.id);
  }

  @Get(':username')
  async findOneById(@Param('username') username: string): Promise<User> {
    const user = await this.usersService.findOneByUsername(username);
    if (!user) {
      throw new NotFoundException('Пользователь не существует');
    }
    return user;
  }

  @Get(':username/wishes')
  async findWishesByUserName(@Param('username') username: string) {
    const user = await this.usersService.findOneByUsername(username);
    return await this.wishesService.findManyByOwner(user.id);
  }

  @UseInterceptors(TransformInterceptor)
  @Post('find')
  async findMany(@Body() user): Promise<User[]> {
    return this.usersService.findMany(user);
  }

  @UseGuards(JwtGuard)
  @Patch('me')
  async updateMyUser(
    @Req() req,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UpdateResult> {
    return this.usersService.update(req.user.id, updateUserDto);
  }
}
