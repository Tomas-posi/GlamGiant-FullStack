import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { ServicesModule } from './services/services.module';
import { RegistersModule } from './registers/registers.module';
import { ConfigModule } from '@nestjs/config';
import { ProductsModule } from './products/products.module';
import { OrdersModule } from './orders/orders.module';
import { ProductTest } from './ProductTests/product-test.entity';
import { ProductTestsModule } from './ProductTests/product-tests.module';


@Module({
  imports: [ //Cambie esta parte para proteger las claves de la base de datos y eso
    // ConfigModule.forRoot(), no me funcionaba solo me toco forzarlo.
    ConfigModule.forRoot({
      isGlobal: true, // Hace que las variables de .env estén disponibles en toda la app
      envFilePath: '.env', // Especifica el nombre del archivo a cargar
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: Number(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      autoLoadEntities: true,
      synchronize: true,
    }),
    /* Cambie esto 
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'Byd2024*',
      database: 'glamgiant_db',
      autoLoadEntities: true,
      synchronize: true,
    }), */
    UsersModule,
    ServicesModule,
    RegistersModule,
    ProductsModule,
    OrdersModule,
    ProductTestsModule,
  ],
})
export class AppModule {}


