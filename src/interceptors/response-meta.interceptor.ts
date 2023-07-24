import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ResponseMetaInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const now = Date.now();
    const request = context.switchToHttp().getRequest();
    const url = request.originalUrl;

    const formatDateFromTimestamp = (timestamp: number): string => {
      const date = new Date(timestamp);
      const day = date.getDate().toString().padStart(2, '0');
      const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Tháng bắt đầu từ 0
      const year = date.getFullYear().toString();
      const hours = date.getHours().toString().padStart(2, '0');
      const minutes = date.getMinutes().toString().padStart(2, '0');
      const seconds = date.getSeconds().toString().padStart(2, '0');

      return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
    };

    return next.handle().pipe(
      map((data) => {
        return {
          data,
          meta: {
            responseTime: `${Date.now() - now}ms`,
            createAt: formatDateFromTimestamp(now),
            url,
          },
        };
      }),
    );
  }
}
