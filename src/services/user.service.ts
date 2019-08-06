import { Injectable } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { getRepository, getConnection, Like } from 'typeorm';
import { Joke } from '../entities/joke.entity';

@Injectable()
export class UserService {

    async getUsers() {
        const userRepo = await getRepository(User);
        const users = await userRepo.find();
        return users;
    }

    async getUser(userId: number) {
        const userRepo = await getRepository(User);
        const user = await userRepo.find({where: {userId}});
        return user;
    }

    async searchUsersByUsername(username: string) {
        const userRepo = await getRepository(User);
        const users = await userRepo.find({ where: { username: Like('%' + username + '%') } });
        console.log(users);
        return users;
    }

    async getCustomizedJokes(userId: number) {
        const jokes = await getConnection()
            .query
            ('select j.jokeId, j.text, u.userId, u.username, u.userId, avg(r.rating) avgRating, date(j.dateCreated) timeStamp, ' +
             ' getScoreOfJokeForUser(j.jokeId, ?) score from joke j join user u on (j.userUserId = u.userId)' +
             ' left join rate r on (j.jokeId = r.jokeJokeId)' +
             ' group by (j.jokeId) order by score desc, timestamp desc limit 20;', [ userId ]);

        return jokes;
    }

    async validateLogin(userObj: any) {
        const userRepo = await getRepository(User);
        const user = await userRepo.findOne({ where: { username: userObj.username, password: userObj.password } });
        if (user === null) {
            return null;
        } else {
            return user;
        }
    }
}
