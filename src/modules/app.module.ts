import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guards';
import { RolesGuard } from 'src/auth/guards/roles.guards';
import { BarroomModule } from './barroom.module';
import { OpeningHoursModule } from './opening-hours.module';
import { ProductsModule } from './products.module';
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
    ProductsModule,
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
  ],
})
export class AppModule {}
