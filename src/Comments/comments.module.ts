import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { CommentsController } from "./comments.controller";
import { CommentsService } from "./comments.service";
import { CommentSchema } from "./comments.model";

@Module({
    imports: [ MongooseModule.forFeature([ { name: "Comment", schema: CommentSchema } ]) ],
    controllers: [ CommentsController ],
    providers: [ CommentsService ]
})
export class CommentsModule { }