import {
  Injectable,
  PipeTransform,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';

@Injectable()
export class AgeValidationPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    console.log('metadata', metadata);
    const age = parseInt(value.age, 10);
    if (isNaN(age) || age <= 0) {
      throw new BadRequestException('Age must be a positive number.');
    }
    return value;
  }
}
