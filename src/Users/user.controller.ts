import { Controller, Get, Post, Body, Param } from "@nestjs/common";

import { UserService } from "./user.service";
import { User } from "./user.model";

@Controller("users")
export class UserController { 
    
    constructor(private readonly userService: UserService){ }

    @Get()//maps out to "localhost:3000/user"
    async getUsers(): Promise<User[]> {
        return await this.userService.getUsers();
    }

    @Get(":id")//maps out to "localhost:3000/user/29182930382"
    async getUser(@Param("id") userId: string): Promise<User> {
        return  await this.userService.getUser(userId);
    }

    @Post()//Add user; //maps out to: "localhost:3000/user"
    async addUser(
        @Body("username") username: string,
        @Body("password") password: string
    ): Promise<any> {
        return await this.userService.addUser(username, password);
    }

    @Post("verify-user")//maps out to: "localhost:3000/user/verify-user"
    async verifyUser(
        @Body("username") username: string,
        @Body("password") password: string
    ): Promise<boolean> {
        return await this.userService.verifyUser(username, password);
    }

}