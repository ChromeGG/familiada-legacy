import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
} from '@nestjs/websockets'
import { UserService } from './user.service'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'

@WebSocketGateway()
export class UserGateway {
  constructor(private readonly userService: UserService) {}

  @SubscribeMessage('createUser')
  create(@MessageBody() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto)
  }

  @SubscribeMessage('findAllUsers')
  findAll() {
    console.log('all USRS')
    return [] //this.userService.findAll()
  }

  @SubscribeMessage('findOneUser')
  findOne(@MessageBody() id: number) {
    return this.userService.findOne(id)
  }

  @SubscribeMessage('updateUser')
  update(@MessageBody() updateUserDto: UpdateUserDto) {
    return this.userService.update(updateUserDto.id, updateUserDto)
  }

  @SubscribeMessage('removeUser')
  remove(@MessageBody() id: number) {
    return this.userService.remove(id)
  }
}
