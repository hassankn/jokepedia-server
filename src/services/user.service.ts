import { Injectable } from '@nestjs/common';
import { User as UserEntity } from '../entities/user.entity';
import { getRepository } from 'typeorm';

@Injectable()
export class UserService {

    async getUsers() {
        const userRepo = await getRepository(UserEntity);
        const users = await userRepo.find();
        return users;
    }
}
