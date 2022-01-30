import { Injectable } from '@nestjs/common';
import {randomBytes} from 'crypto';

@Injectable()
export class GamesService {
  getData(): { message: string } {
    return { message: 'Welcome to backend!' };
  }

  createGame() {
    const id = randomBytes(3).toString('hex')
    
    return {id}
  }
}
