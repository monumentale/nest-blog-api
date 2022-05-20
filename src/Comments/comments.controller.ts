import { Controller, Get, Post, Body, Param } from "@nestjs/common";

import { CommentsService } from "./comments.service";

@Controller("comments")//maps put to "localhost:3000/comments/"
export class CommentsController { 

    constructor(private readonly commentService: CommentsService){ }
    
    @Get(":id")//maps out to "localhost:3000/comments/0293839392"
    async getComments(@Param("id") postId: string): Promise<Comment[]>{
        return await this.commentService.getComments(postId);
    }

    @Get(":id/count-comments")//maps out to "localhost:30000/comments/count-comments"
    async countComments(@Param("id") postId: string): Promise<{ total: number }>{
        return await this.commentService.countComments(postId);
    }

    @Post()///maps out to "localhost:3000/comments"
    async addComment(
        @Body("postId") postId: string,
        @Body("commentBody") commentBody: string,
        @Body("commentBy") commentBy?: string,
        @Body("imageUrl") imageUrl?: string
    ): Promise<Comment> {
        return await this.commentService.addComment(postId, commentBody, commentBy, imageUrl);
    }
}