import { Controller, Post, Get, Patch, Delete, Body, Param } from "@nestjs/common";

import { PostsService } from "./posts.service";

@Controller("posts")
export class PostsController {

    constructor(private readonly postsService: PostsService){ }

    @Get()
    async getPosts(): Promise<any> {
        return await this.postsService.getPosts();
    }

    @Get(":id")
    async getSinglePost(@Param("id") postId: string): Promise<any>{
        return await this.postsService.getPost(postId);
    }

    @Post()
    async addPost(
        @Body("imageUrl") imageUrl: string,
        @Body("title") title: string,
        @Body("postBody") post: string,
        @Body("userId") userId: string
    ): Promise<{ id: string, message: string }>{
        return await this.postsService.addPost(imageUrl, title, post, userId);
    }

    @Patch(":id")
    async updatePost(
        @Param("id") postId: string,
        @Body("imageUrl") imageUrl: string,
        @Body("title") title: string,
        @Body("body") post: string
    ): Promise<{ message: string }>{
        return await this.postsService.updatePost(postId, imageUrl, title, post);
    }

    @Delete(":id")
    async deletePost(@Param("id") postId: string): Promise<{ message: string }>{
        return await this.postsService.deletePost(postId);
    }
}