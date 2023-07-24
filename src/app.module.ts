import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
// import { ProductsController } from './products/products.controller';
// import { UsersController } from './users/users.controller';
import { AuthMiddleware } from './middleware/auth.middleware';
import { WebhookModule } from './webhook/webhook.module';

@Module({
  imports: [UsersModule, ProductsModule, WebhookModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware, AuthMiddleware).forRoutes('*');
    // consumer.apply(LoggerMiddleware, AuthMiddleware).forRoutes(UsersController);
    // consumer.apply(LoggerMiddleware).forRoutes(ProductsController);
  }
}
