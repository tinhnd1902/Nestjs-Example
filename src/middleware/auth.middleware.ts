import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    const authHeader = req.headers['authorization'];
    // console.log(1, req.headers);

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException(
        'Invalid or missing authorization header',
      );
    }

    // const token = authHeader.split(' ')[1];
    // console.log(2, token);
    // Ở đây, thực hiện kiểm tra token hợp lệ, ví dụ kiểm tra token với hệ thống xác thực.
    // Trong ví dụ này, giả định token hợp lệ.
    // Nếu token không hợp lệ, có thể ném một UnauthorizedException.

    // Tiếp tục xử lý yêu cầu nếu token hợp lệ
    next();
  }
}
