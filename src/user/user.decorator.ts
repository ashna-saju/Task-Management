import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
<<<<<<< HEAD
);
=======
);

>>>>>>> 95154a3034fbc290b89c0b04fad7cc87be5e3e6d
