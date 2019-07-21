import { Get, Controller, Res, Post, Headers } from '@nestjs/common';
import { UserService } from 'src/services/user.service';
import { Response as ServerResponse } from 'express-serve-static-core';

@Controller('user')
export class UserController {

    constructor(
        private readonly userService: UserService,
    ) { }

    @Get()
    async getUsers(@Res() res: ServerResponse) {
        const users = await this.userService.getUsers();
        res.send(users);
      }
}