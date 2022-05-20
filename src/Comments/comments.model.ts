import * as mongoose from "mongoose";

export const CommentSchema = new mongoose.Schema({
    imageUrl: { type: String, required: true, default: "~/images/default_image/user_male.png" },
    commentBy: { type: String, required: true, default: "anonymous" },
    commentBody: { type: String, required: true },
    dateCreated: { type: Date, required: true, default: Date.now },
    postId: { type: mongoose.Schema.Types.ObjectId, ref: "Posts", required: true }
});

export interface Comment extends mongoose.Document {
    id: string;
    imageUrl: string;
    commentBy?: string;
    commentBody: string;
    dateCreated: Date;
    postId: string;//Seves as a "fk" of sorts b/w "posts" & "comments" Collections
}