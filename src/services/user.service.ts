import { Injectable } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { getRepository, getConnection, Like } from 'typeorm';
import { Joke } from '../entities/joke.entity';
import { Follow } from 'src/entities/follow.entity';

@Injectable()
export class UserService {

    async getUsers() {
        const userRepo = await getRepository(User);
        const users = await userRepo.find();
        return users;
    }

    async getUser(userId: number) {
        const userRepo = await getRepository(User);
        const user = await userRepo.find({ where: { userId } });
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
            ('select j.jokeId, j.text, category.name as "Category",u.userId, u.username, u.userId, avg(r.rating) avgRating, date(j.dateCreated) timeStamp,' +
                'getScoreOfJokeForUser(j.jokeId, 2) score from joke j join user u on (j.userUserId = u.userId)' +
                'left join rate r on (j.jokeId = r.jokeJokeId)' +
                'left join joke_categories_category on (j.jokeId = joke_categories_category.jokeJokeId)' +
                'left join category on (joke_categories_category.categoryCategoryId = category.categoryId)' +
                'group by j.jokeId, Category order by score desc, timestamp desc limit 20;', [userId]);

        return jokes;
    }

    async registerUser(newUser: any) {
        const checkUser = await getRepository(User).findOne({ where: { username: newUser.username } });
        let res = null;
        // if user is null we can add the new user
        if (checkUser == null) {
            const userToInsert = JSON.parse(JSON.stringify(newUser));
            userToInsert.level = 1;
            res = await getRepository(User).save(userToInsert);
        }
        return res;
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

    async getFollowees(userId: number) {
        const followees = await getConnection().query(
            'SELECT userId, username, name, email, levelLevelId ' +
            'FROM follow JOIN user ON followsUserId = userId WHERE followerUserId = ?;', [userId]);

        return followees;
    }

    async getFollowers(userId: number) {
        const followers = await getConnection().query(
            'SELECT userId, username, name, email, levelLevelId ' +
            'FROM follow JOIN user ON followerUserId = userId WHERE followsUserId = ?;', [userId]);

        return followers;
    }

    async followUser(followerId: number, followeeId: number) {
        const followUser = await getConnection().query('insert into follow values (?, ?);', [followeeId, followerId]);

        return followUser;
    }

    async unFollowUser(followerId: number, followeeId: number) {
        const followUser = await getConnection()
            .query('delete from follow where followsUserId = ? and followerUserId = ?;', [followeeId, followerId]);

        return followUser;
    }
}
