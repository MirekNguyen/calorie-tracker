import { Body, Controller, Post, SetMetadata } from '@nestjs/common';
import { AuthService } from './auth.service';

const AllowUnauthorizedRequest = () => SetMetadata('allowUnauthorizedRequest', true);

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('sign-in')
  @AllowUnauthorizedRequest()
  singIn(
    @Body() {username, password},
  ) {
    return this.authService.signIn(username, password);
  }
}
