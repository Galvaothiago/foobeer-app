import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guards';
import { BarRoom } from 'src/entities/barroom/barroom.entity';
import { OpeningHours } from 'src/entities/openinig-hours/opening-hours.entity';
import { BarroomModule } from './barroom.module';
import { OpeningHoursModule } from './opening-hours.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('TYPE_ORM_DB_HOST', '127.0.0.1'),
        port: Number(configService.get('TYPE_ORM_DB_PORT', 3306)),
        username: configService.get('TYPE_ORM_DB_USERNAME', 'root'),
        password: configService.get('TYPE_ORM_DB_PASSWORD', '091041212'),
        database: configService.get('TYPE_ORM_DB_DATABASE', 'foobeer'),
        // entities: [__dirname + './**/*.entity{.js, .ts}'],]
        entities: [BarRoom, OpeningHours],
        synchronize: true,
      }),
    }),
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    BarroomModule,
    OpeningHoursModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
