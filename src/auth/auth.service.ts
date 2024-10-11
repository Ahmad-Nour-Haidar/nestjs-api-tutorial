import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  signup() {
    return 'User signed up successfully.';
  }

  signin() {
    return 'User signed in successfully.';
  }
}
