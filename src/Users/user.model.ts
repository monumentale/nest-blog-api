import * as mongoose from "mongoose";
import * as UniqueValidator from "mongoose-unique-validator";

export const UserSchema = new mongoose.Schema({
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    dateCreated: { type: Date, required: true, default: Date.now }
});

/**
 * add UniqueValidator plugin the always make sure any new email added as a username is unique
 */
UserSchema.plugin(UniqueValidator); 

export interface User extends mongoose.Document {
    id: string;
    username: string;
    password: string;
}