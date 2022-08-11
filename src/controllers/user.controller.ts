import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { Roles } from 'src/decorators/user-roles.decorator';
import { CreateUserDto } from 'src/entities/user/dto/create-user.dto';
import { Role } from 'src/entities/user/roles-enum';
import { User } from 'src/entities/user/user.entity';
import { UserService } from 'src/services/user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Roles(Role.GOD, Role.ADMIN)
  @Post('/')
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Roles(Role.GOD, Role.ADMIN)
  @Get('/')
  async getAllUsers() {
    return this.userService.getAllUser();
  }

  @Get('/me')
  async getAllBarrooms(@CurrentUser() user: User) {
    return this.userService.getUserInformation(user);
  }

  @Get('/:username')
  async createBarroom(@Param('username') username: string) {
    return this.userService.findByUsername(username);
  }
}
