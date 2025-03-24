import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { ServicesModule } from './services/services.module';
import { RegistersModule } from './registers/registers.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'Byd2024*',
      database: 'glamgiant_db',
      autoLoadEntities: true,
      synchronize: true,
    }),
    UsersModule,
    ServicesModule,
    RegistersModule,
  ],
})
export class AppModule {}


