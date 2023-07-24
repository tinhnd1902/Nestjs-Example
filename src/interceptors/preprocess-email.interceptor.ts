import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class PreprocessEmailInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const { email } = request.body;

    if (email) {
      // Cắt bỏ khoảng trắng và chuyển đổi email thành chữ thường
      request.body.email = email.trim().replace(/\s+/g, '').toLowerCase();
    }

    return next.handle();
  }
}
