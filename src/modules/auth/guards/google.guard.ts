import { AuthGuard } from '@nestjs/passport';
import { ExecutionContext } from '@nestjs/common';

export class GoogleGuard extends AuthGuard('google') {
  canActivate(context: ExecutionContext): any {
    const request = context.switchToHttp().getRequest();
    const { query } = request;
    request.session.query = query;
    return super.canActivate(context);
  }
}
