import { Injectable } from '@nestjs/common';
import { JwtService } from "@nestjs/jwt";
import { UserService } from '../users/user.service';
import { User } from '../users/user.model';

@Injectable()
export class AuthService {

    constructor(private readonly userService: UserService, private readonly jwtService: JwtService){ }

    async validateUser(username: string, pass: string){
        const user = await this.userService.findUser(username);
        if(user && user.password === pass){
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    async login(user: User) {
        const payload = { username: user.username, password: user.password, sub: user._id };
        //return jwt token
        return {
            access_token: this.jwtService.sign(payload)
        }
    }
}
