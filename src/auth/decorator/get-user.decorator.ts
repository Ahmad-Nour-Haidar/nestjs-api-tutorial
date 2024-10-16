import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from '@prisma/client';

export const GetUser = createParamDecorator(
  (data: string | undefined, ctx: ExecutionContext) => {
    // const request: Express.Request = ctx.switchToHttp().getRequest();
    const request = ctx.switchToHttp().getRequest() as Express.Request & {
      user: User;
    };
    if (data) {
      return request.user[data];
    }
    return request.user;
  },
);
