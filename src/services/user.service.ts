import { Injectable } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { getRepository } from 'typeorm';
import { Joke } from '../entities/joke.entity';

@Injectable()
export class UserService {

    async getUsers() {
        const userRepo = await getRepository(User);
        const users = await userRepo.find();
        return users;
    }

    // get number of jokes posted by a user
    async getNumberOfJokesPosted(userId: number) {
        const count = await getRepository(Joke)
            .createQueryBuilder('joke')
            .select('COUNT(*)', 'count')
            .where({user: userId})
            .getRawOne();

        return count;
    }
}
