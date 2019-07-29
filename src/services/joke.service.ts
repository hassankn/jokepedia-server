import { Injectable } from '@nestjs/common';
import { Joke } from '../entities/joke.entity';
import { getRepository, getConnection } from 'typeorm';
import { User } from '../entities/user.entity';

@Injectable()
export class JokeService {

    async getJokesByUserId(userId: number) {
        const jokeRepo = await getRepository(Joke);
        const jokes = await jokeRepo.find({ where: { user: userId } });
        return jokes;
    }

    async postJokeByUser(uid: number, jokeText: string) {
        const jokeRepo = await getRepository(Joke);
        const userRepo = await getRepository(User);

        const userPosted = await userRepo.findOne({ where: { userId: uid } });

        const newJoke = new Joke();

        newJoke.user = userPosted;
        newJoke.text = jokeText;

        return await jokeRepo.insert(newJoke);
    }

    // get number of jokes posted by a user
    async getNumberOfJokesPosted(userId: number) {
        const count = await getRepository(Joke)
            .createQueryBuilder('joke')
            .select('COUNT(*)', 'count')
            .where({ user: userId })
            .getRawOne();

        return count;
    }

    // this service gets average ratings of all user jokes
    async getAverageOfJokesPosted(userId: number) {
        const avg = await getConnection()
            .query
            ('select avg(avgs) from (select avg(rating) avgs  from rate join joke on (joke.jokeId = rate.jokeJokeId)'
                + ' where joke.userUserId = ? '
                + ' group by (rate.jokeJokeId)) t', [userId]);

        return avg;
    }

    // this service is to fetch top 10 jokes posted by the user
    async getTopRatedJokes(userId: number) {
        const topJokes = await getConnection()
            .query
            ('select joke.text,avg(rating) avgs ' +
                'from rate join joke on (joke.jokeId = rate.jokeJokeId) ' +
                'where joke.userUserId = ? ' +
                'group by (rate.jokeJokeId) order by avgs desc limit 10;', [userId]);

        return topJokes;
    }

}
