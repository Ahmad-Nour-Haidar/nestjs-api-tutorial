import { Injectable } from '@nestjs/common';
import { User, Bookmark } from '@prisma/client';

@Injectable()
export class AuthService {
  signup() {
    return 'User signed up successfully.';
  }

  signin() {
    return 'User signed in successfully.';
  }
}
