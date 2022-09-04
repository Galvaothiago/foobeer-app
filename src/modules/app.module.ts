import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guards';
import { RolesGuard } from 'src/auth/guards/roles.guards';
import { AllExceptionsFilter } from 'src/exceptions/all-exceptions.filter';
import { HttpExceptionFilter } from 'src/exceptions/http-exception.filter';
import { BarroomModule } from './barroom.module';
import { CategoryModule } from './category.module';
import { OpeningHoursModule } from './opening-hours.module';
import { ProductModule } from './product.module';
import { UserModule } from './user.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'mysql',
        host: process.env.TYPE_ORM_DB_HOST,
        port: Number(process.env.TYPE_ORM_DB_PORT),
        username: process.env.TYPE_ORM_DB_USERNAME,
        password: process.env.TYPE_ORM_DB_PASSWORD,
        database: process.env.TYPE_ORM_DB_DATABASE,
        entities: [__dirname + '../../**/*.entity{.js, .ts}'],
        synchronize: true,
      }),
    }),

    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    UserModule,
    BarroomModule,
    OpeningHoursModule,
    ProductModule,
    CategoryModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },

    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
})
export class AppModule {}
