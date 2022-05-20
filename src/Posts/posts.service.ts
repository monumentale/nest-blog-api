import { NotFoundException, ForbiddenException } from "@nestjs/common";

import { InjectModel } from "@nestjs/mongoose";

import { Model } from "mongoose";

import { Post } from "./posts.model";

export class PostsService { 

    //Inject the post Model which we can run mongodb operations directly on
    constructor(@InjectModel("Posts") private readonly postsModel: Model<Post>){ }

    async addPost(imageUrl: string, title: string, postBody: string, userId: string): Promise<{ id: string, message: string }> {
        //@TODO: Add Image Upload to this method
        //init the PostsModel using data gotten from the request body
        const newPost = new this.postsModel({ imageUrl, title, postBody, userId });

        //check if similar post exists b/4 inserting to the db
        if(await this.postsModel.exists({ title, postBody })){
            throw new ForbiddenException("Post already exists in the database"); 
        }

        //save the entry to mongodb
        const result = await newPost.save();
        console.log(result);
        return { id: result.id, message: "Post added" };  
    }

    async getPosts(): Promise<any[]> {
        const posts = await this.postsModel
                                .find()
                                .sort({ dateCreated: "desc" })
                                .exec();

        return posts.map(p => ({ id: p._id, 
                                imageUrl: p.imageUrl, 
                                title: p.title, 
                                postBody: p.postBody,
                                dateCreated: p.dateCreated,
                                userId: p.userId
                            }));
    }

    async getPost(postId: string): Promise<any> {
        const post = await this.findPost(postId);
        return { id: post._id, 
                title: post.title, 
                postBody: post.postBody, 
                dateCreated: post.dateCreated, 
                userId: post.userId 
            };
    }

    async deletePost(postId: string): Promise<{ message: string }> {
        const result = await this.postsModel.deleteOne({ _id: postId }).exec();
        if(result.n === 0){
            throw new NotFoundException("Post was not deleted because it was not found");
        }
        return { message: "Post was deleted" };
    }

    async updatePost(postId: string, imageUrl: string, title: string, post: string): Promise<{ message: string }> {
        const updatedPost = await this.findPost(postId);

        if(imageUrl){
            updatedPost.imageUrl = imageUrl;
        }
        if(title){
            updatedPost.title = title;
        }
        if(post){
            updatedPost.postBody = post;
        }
        await updatedPost.save();

        console.log(updatedPost);

        return { message: "Post was updated" };
    }

    private async findPost(postId: string): Promise<Post> {
        let post;
        try{
            post = await this.postsModel.findById(postId).exec();
        }
        catch(Exception){
            throw new NotFoundException("Could not find post");
        }
       
        if(!post){
            throw new NotFoundException("Could not find post");
        }

        return post as Post;
    }

}