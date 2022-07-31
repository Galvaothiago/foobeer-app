import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from '../controllers/app.controller';
import { AppService } from '../services/app.service';
import { BarroomModule } from './barroom.module';

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
        entities: [__dirname + '/**/*.entity{.js, .ts}'],
        synchronize: true,
      }),
    }),
    ConfigModule.forRoot({ isGlobal: true }),
    BarroomModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
