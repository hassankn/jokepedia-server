import { Get, Controller, Res, Post, Headers, Param } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { Response as ServerResponse } from 'express-serve-static-core';
import { JokeService } from '../services/joke.service';
import { async } from 'rxjs/internal/scheduler/async';

@Controller('user')
export class UserController {

    constructor(
        private readonly userService: UserService,
        private readonly jokeService: JokeService,
    ) { }

    @Get()
    async getUsers(@Res() res: ServerResponse) {
        const users = await this.userService.getUsers();
        res.send(users);
    }

    @Get(':userId/userjokes')
    async getUserJokes(
        @Res() res: ServerResponse,
        @Param('userId') userId: number,
    ) {
        const jokes = await this.jokeService.getJokesByUserId(userId);
        res.send(jokes);
    }

    @Get(':userId/userJokesCount')
    async getUserJokesCount(
        @Res() res: ServerResponse,
        @Param('userId') userId: number,
    ) {
        const count = await this.userService.getNumberOfJokesPosted(userId);
        res.send(count);
    }

    @Get(':userId/getAverageOfJokesPosted')
    async getAverageOfJokesPosted(

        @Res() res: ServerResponse,
        @Param('userId') userId: number,
    ){
        const avg = await this.userService.getAverageOfJokesPosted(userId);
        res.send(avg);
    }
}
