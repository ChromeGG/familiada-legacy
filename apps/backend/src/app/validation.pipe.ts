import {
  Injectable,
  PipeTransform,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common'
import { ObjectSchema } from 'joi'

@Injectable()
export class JoiValidationPipe implements PipeTransform {
  constructor(private schema: ObjectSchema) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  transform(input: unknown, metadata: ArgumentMetadata) {
    const { error, value } = this.schema.validate(input, { abortEarly: false })
    // TODO add logger
    console.log(error)
    if (error) {
      throw new BadRequestException(error)
    }
    return value
  }
}
