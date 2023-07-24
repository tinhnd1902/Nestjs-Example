import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    console.log(`Request received: ${req.method} ${req.url}`);
    // console.log(`Response received: ${res}`);
    next();
  }
}
