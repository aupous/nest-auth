import { User } from 'src/modules/user/user.schema';

export type AuthResponse = {
  user: User;
  accessToken: string;
};
