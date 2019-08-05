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

    @Get('getJokesForCategory/:categoryId')
    async getJokesForCategory(
        @Res() res: ServerResponse,
        @Param('categoryId') categoryId: number,
    ) {
        const data = await this.jokeService.getJokesForCategory(categoryId);
        res.send(data);
    }

    @Get('getJokesForUsername/:username')
    async getJokesForUsername(
        @Res() res: ServerResponse,
        @Param('username') username: string,
    ) {
        const data = await this.jokeService.getJokesForUsername(username);
        res.send(data);
    }

    @Get('getCategories')
    async getCategories(
        @Res() res: ServerResponse,
    ) {
        const categories = await this.jokeService.getCategories();
        res.send(categories);
    }

    @Post(':userId/postJoke')
    async postJoke(
        @Res() res: ServerResponse,
        @Param('userId') userId: number,
        @Body('newJoke') newJoke: any) {

        const response = await this.jokeService.postJoke(newJoke, userId);
        res.send(response);
    }

    @Post(':userId/rateJoke')
    async rateJoke(
        @Res() res: ServerResponse,
        @Param('userId') userId: number,
        @Body('newRate') newRate: any) {

        const response = await this.jokeService.rateJoke(newRate, userId);
        res.send(response);
    }

    @Get('getTopTenOfYear')
    async getTopTenOfYear(
        @Res() res: ServerResponse,
    ) {
        const jokes = await this.jokeService.getTopTenOfYear();
        res.send(jokes);
    }

    @Get('getTopTenOfMonth')
    async getTopTenOfMonth(
        @Res() res: ServerResponse,
    ) {
        const jokes = await this.jokeService.getTopTenOfMonth();
        res.send(jokes);
    }

    @Get('getTopTenOfAllTime')
    async getTopTenOfAllTime(
        @Res() res: ServerResponse,
    ) {
        const jokes = await this.jokeService.getTopTenOfAllTime();
        res.send(jokes);
    }

    @Get('searchUsersByUsername/:username')
    async searchUsersByUsername(
        @Res() res: ServerResponse,
        @Param('username') username: string
    ) {
        const users = await this.userService.searchUsersByUsername(username);
        console.log(users);
        res.send(users);
    }

}
