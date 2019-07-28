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

    //this service is to fetch top 10 jokes posted by the user
    async getTopRatedJokes(userId: number) {
        const topJokes = await getConnection()
            .query
            ('select joke.text,avg(rating) avgs '+ 
            'from rate join joke on (joke.jokeId = rate.jokeJokeId) '+
            'where joke.userUserId = ? ' +
            'group by (rate.jokeJokeId) order by avgs desc limit 10;', [userId]);

        return topJokes;
    }

}
