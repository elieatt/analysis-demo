import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { isLocale } from 'class-validator';

export const Locale = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request: Request = ctx.switchToHttp().getRequest();
    const acceptLanguage: string | undefined =
      request.headers['accept-language'];
    return acceptLanguage && isLocale(acceptLanguage)
      ? acceptLanguage.split(',')[0]
      : 'en-US';
  },
);
