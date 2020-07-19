import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcryptjs';
import { UserService } from '../user/user.service';
import { User } from '../user/user.schema';
import { CreateUserDTO } from '../user/user.dto';
import { AuthResponse } from './auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.userService.findWithPassword(email);
    if (user && (await compare(pass, user.password))) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  userToAccessToken(user: User): { user: User; accessToken: string } {
    const payload = { email: user.email, sub: user._id };
    return {
      user,
      accessToken: this.jwtService.sign(payload),
    };
  }

  async signUpUser(user: CreateUserDTO): Promise<AuthResponse> {
    const newUser = await this.userService.create(user);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userData } = newUser.toJSON();
    const payload = { email: newUser.email, sub: newUser._id };
    return {
      user: userData,
      accessToken: this.jwtService.sign(payload),
    };
  }

  async signInGoogle(data: CreateUserDTO): Promise<AuthResponse> {
    let user: User;
    const existUser = await this.userService.findOne({ email: data.email });
    if (existUser) {
      user = existUser;
    } else {
      user = await this.userService.create(data);
    }
    const payload = { email: user.email, sub: user._id };
    return {
      user: user,
      accessToken: this.jwtService.sign(payload),
    };
  }
}
