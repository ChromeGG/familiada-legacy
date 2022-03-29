import { PartialType } from '@nestjs/mapped-types'
import { CreatePlayerDto } from './create-game.dto'

export class UpdatePlayerDto extends PartialType(CreatePlayerDto) {
  id: number
}
