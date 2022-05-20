import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { AuthService } from './auth.service';
import { UserModule } from '../users/user.module';
import { LocalStrategy } from './local.strategy';
import { jwtConstants } from "./constants";
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [ 
    UserModule, 
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: "60s" }//set up default details for the token
    })
  ],
  providers: [
    AuthService, 
    LocalStrategy,
    JwtStrategy
  ],
  exports: [ AuthService ]
})
export class AuthModule { }
