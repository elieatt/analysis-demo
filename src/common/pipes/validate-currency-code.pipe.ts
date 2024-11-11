import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { isISO4217CurrencyCode } from 'class-validator';

@Injectable()
export class ValidateCurrencyCodePipe implements PipeTransform {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  transform(value: any, metadata: ArgumentMetadata) {
    if (value && !isISO4217CurrencyCode(value)) {
      throw new BadRequestException('Invalid currency code');
    }
    return value ? value.toUpperCase() : undefined;
  }
}
