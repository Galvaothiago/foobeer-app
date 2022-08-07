import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { IsPublic } from 'src/decorators/endpoint-public.decorator';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guards';
import { BarroomService } from 'src/services/barroom.service';
import { CreateBarroomDto } from 'src/entities/barroom/dto/create-barroom.dto';
import { User } from 'src/entities/user/user.entity';
import { UserService } from 'src/services/user.service';
import { CreateUserDto } from 'src/entities/user/dto/create-user.dto';

interface AuthRequest extends Request {
  user: User;
}

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @IsPublic()
  @Post('signup')
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @IsPublic()
  @Get('/email/:email')
  verifyExistsEmail(@Param('email') email: string) {
    if (!!email) {
      return this.userService.findByEmail(email);
    }
  }

  @IsPublic()
  @Post('signin')
  @HttpCode(200)
  @UseGuards(LocalAuthGuard)
  login(@Request() request: AuthRequest) {
    return this.authService.login(request.user);
  }
}
