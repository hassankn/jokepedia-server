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

    async searchUsersByUsername(username: string) {
        const userRepo = await getRepository(User);
        const users = await userRepo.find({ where: { username: Like('%' + username + '%') } });
        console.log(users);
        return users;
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
