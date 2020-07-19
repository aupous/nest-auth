import {
  Controller,
  UseGuards,
  Post,
  Body,
  Get,
  Res,
  Req,
  Request,
  Query,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { AuthResponse } from './auth.dto';
import { CreateUserDTO } from '../user/user.dto';
import { GoogleGuard } from './guards/google.guard';
import { Response } from 'express';
import { RequestWithUser } from 'src/common/interfaces/request-with-user';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('sign-in')
  async signIn(@Request() req: RequestWithUser): Promise<AuthResponse> {
    return this.authService.userToAccessToken(req.user);
  }

  @Post('sign-up')
  async signUp(@Body() payload: CreateUserDTO): Promise<AuthResponse> {
    return this.authService.signUpUser(payload);
  }

  @UseGuards(GoogleGuard)
  @Get('google')
  googleLogin(): void {
    // initiates the Google OAuth2 login flow
  }

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleLoginCallback(
    @Req() req: RequestWithUser,
    @Res() res: Response,
  ): Promise<void> {
    const data = await this.authService.signInGoogle(req.user);
    const { redirectUrl } = req.session.query;
    return res.redirect(
      `${redirectUrl}?token=${data.accessToken}&name=${data.user.name}&email=${data.user.email}`,
    );
  }

  @Get('success')
  signInGoogleSuccess(@Query('name') name: string): string {
    return `Sign in Google success with name: ${name}`;
  }
}
