import { Injectable } from '@nestjs/common';
import { Joke } from '../entities/joke.entity';
import { getRepository } from 'typeorm';
import { User } from '../entities/user.entity';

@Injectable()
export class JokeService {

    async getJokesByUserId(userId: number) {
        const jokeRepo = await getRepository(Joke);
        const jokes = await jokeRepo.find({where: {user: userId}});
        return jokes;
    }

    async postJokeByUser(uid: number, jokeText: string) {
        const jokeRepo = await getRepository(Joke);
        const userRepo = await getRepository(User);

        const userPosted = await userRepo.findOne({where: {userId: uid}});

        const newJoke = new Joke();

        newJoke.user = userPosted;
        newJoke.text = jokeText;

        return await jokeRepo.insert(newJoke);
    }

}
