import { ObjectId } from "bson";

export interface IUser {
    _id : ObjectId,
    email : string,
    firstName : string,
    lastName : string,
    password : string,
    role ?:ObjectId[]
}