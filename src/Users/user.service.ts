import { ForbiddenException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

import { User } from "./user.model";

export class UserService { 
    constructor(@InjectModel("User") private readonly UserModel: Model<User>){ }

    async getUsers(): Promise<any[]> {
        const users = await this.UserModel
                          .find()
                          .sort({ dateCreated: "desc" })
                          .exec();

        return users.map(user => ({
            id: user._id,
            username: user.username,
            password: user.password
        }));
    }

    async getUser(userId: string): Promise<any> {
        const user = await this.UserModel.findOne({ userId }).exec();
        return { id: user._id, username: user.username };
    }

    async verifyUser(username: string, password: string): Promise<boolean> {
        return await this.UserModel.exists({ username, password });
    }//if user.isFound() issue jwt token to be used when interacting with protected routes

    async addUser(username: string, password: string): Promise<any> {
        const newUser = new this.UserModel({ username, password });

        try{
            if(await this.verifyUser(username, password)){
                throw new ForbiddenException("User already exists");
            }
            return await newUser.save();
        }
        catch(ForbiddenException){
            throw new ForbiddenException("User already exists");
        }
    }

    //running sample from nestjs docs
    async findUser(username:string): Promise<User | undefined>{
        return await this.UserModel.findOne({ username }).exec();
    }
}