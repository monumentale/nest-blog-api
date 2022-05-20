import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from "@nestjs/mongoose";
import { PostsModule } from './Posts/posts.module';
import { CommentsModule } from './Comments/comments.module';
import { UserModule } from './Users/user.module';
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [
    PostsModule,
    CommentsModule,
    UserModule,
    MongooseModule.forRoot(
      "mongodb://localhost:27017/blog-api", 
      { useNewUrlParser: true }),
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
