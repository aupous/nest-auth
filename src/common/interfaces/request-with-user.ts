import { Request } from 'express';
import { User } from 'src/modules/user/user.schema';

export interface RequestWithUser extends Request {
  user: User;
}
