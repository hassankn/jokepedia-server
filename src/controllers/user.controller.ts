import { Get, Controller, Res, Post, Headers, Param, Body } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { Response as ServerResponse } from 'express-serve-static-core';
import { JokeService } from '../services/joke.service';

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
        const count = await this.jokeService.getNumberOfJokesPosted(userId);
        res.send(count);
    }

    @Get(':userId/averageOfJokesPosted')
    async getAverageOfJokesPosted(
        @Res() res: ServerResponse,
        @Param('userId') userId: number,
    ) {
        const avg = await this.jokeService.getAverageOfJokesPosted(userId);
        res.send(avg);
    }

    @Post(':userId/postJoke')
    async postJoke(
        @Res() res: ServerResponse,
        @Param('userId') userId: number,
        @Body('jokeText') jokeText: string,
    ) {
        const response = this.jokeService.postJokeByUser(userId, jokeText);
        res.send(response);
    }
    @Get(':userId/getTopJokesPosted')
    async getTopJokesPosted(

        @Res() res: ServerResponse,
        @Param('userId') userId: number,
    ) {
        const topJokes = await this.jokeService.getTopRatedJokes(userId);
        res.send(topJokes);
    }

    @Get('getTenRandomJokes')
    async getTenRandomJokes(

        @Res() res: ServerResponse,
    ) {
        const jokes = await this.jokeService.getTenRandomJokes();
        res.send(jokes);
    }

    @Get('getJokesForCategory/:categoryName')
    async getJokesFprCategory(
        @Res() res: ServerResponse,
        @Param('categoryName') categoryName:string,
    ) {
        const data = await this.jokeService.getJokesForCategory(categoryName);
        res.send(data);
    }
    
    
}
