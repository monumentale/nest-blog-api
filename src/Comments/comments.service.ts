import { ForbiddenException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

import { Comment } from "./comments.model";

export class CommentsService {

    constructor(@InjectModel("Comment") private readonly commentsModel: Model<Comment>){ }

    async addComment(postId: string, commentBy: string, commentBody: string, imageUrl?: string): Promise<any> {
        const newComment = new this.commentsModel({ imageUrl, commentBy, commentBody, postId });

        //Check to see if a similar image already exists
        if(await this.commentsModel.exists({ commentBy, commentBody, postId })){
            throw new ForbiddenException("Comment already exists by you");
        }
        //save the entry to the db
        const result = await newComment.save();

        console.log(result);
        return { id: result._id, 
                imageUrl: result.imageUrl,
                commentBy: result.commentBy, 
                commentBody: result.commentBody,
                dateCreated: result.dateCreated,
                postId: result.postId
            };
    }

    async getComments(postId: string): Promise<any>{
        const comments = await this.commentsModel
                                    .find({ postId })
                                    .sort({ dateCreated: "desc" })
                                    .limit(15)
                                    .exec();

        console.log(comments);
        return comments.map(comment => ({
            id: comment._id,
            imageUrl: comment.imageUrl,
            commentBy: comment.commentBy,
            commentBody: comment.commentBody,
            dateCreated: comment.dateCreated,
            postId: comment.postId
        }));
    }

    async countComments(postId: string): Promise<{ total: number }>{
        console.log(postId);
        const total = await this.commentsModel
                                .countDocuments({ postId })
                                .exec();
        return { total };
    }

}