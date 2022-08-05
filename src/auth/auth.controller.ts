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
import { BarRoom } from 'src/entities/barroom/barroom.entity';

interface AuthRequest extends Request {
  user: BarRoom;
}

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly barroomService: BarroomService,
  ) {}

  @IsPublic()
  @Post('signup')
  createUser(@Body() createBarroomDto: CreateBarroomDto) {
    return this.barroomService.createCompany(createBarroomDto);
  }

  @IsPublic()
  @Get('/:existsEmail')
  verfifyUsername(@Param('email') email: string) {
    if (!!email) {
      return this.barroomService.existBarroomByEmail(email);
    }
  }

  @IsPublic()
  @Post('signin')
  @HttpCode(200)
  @UseGuards(LocalAuthGuard)
  login(@Request() request: AuthRequest) {
    console.log(process.env.JWT_TIME_EXPIRATION);
    return this.authService.login(request.user);
  }
}
