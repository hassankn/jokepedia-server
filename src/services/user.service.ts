import { Injectable } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { getRepository, getConnection } from 'typeorm';
import { Joke } from '../entities/joke.entity';

@Injectable()
export class UserService {

    async getUsers() {
        const userRepo = await getRepository(User);
        const users = await userRepo.find();
        return users;
    }
}
