import * as mongoose from "mongoose";

export const PostsSchema = new mongoose.Schema({
    imageUrl: { type: String, required: true },
    title: { type: String, required: true },
    postBody: { type: String, required: true },
    dateCreated: { type: Date, required: true, default: Date.now },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
});

export interface Post extends mongoose.Document {
    id: string;
    imageUrl: string;
    title: string;
    postBody: string;
    dateCreated?: Date;
    userId?: string;
}