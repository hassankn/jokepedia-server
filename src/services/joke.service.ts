import { Injectable } from '@nestjs/common';
import { Joke } from '../entities/joke.entity';
import { getRepository } from 'typeorm';

@Injectable()
export class JokeService {

    async getJokesByUserId(userId: number) {
        const jokeRepo = await getRepository(Joke);
        const jokes = await jokeRepo.find({where: {user: userId}});
        return jokes;
    }
}
