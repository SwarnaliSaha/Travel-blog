import { IUser } from "./user.type";
import { BaseSchema } from "../../utility/base-schema";
import { Schema, model } from "mongoose";

const UserSchema = new BaseSchema(
    {
        email : {
            type : String,
            required : true,
            unique : true
        },
        firstName : {
            type : String,
            required : true
        },
        lastName : {
            type : String,
            required : true
        },
        password : {
            type : String,
            required : true
        },
        role : {
            type : [Schema.Types.ObjectId],
            ref : 'Role',
            required : true
        }
    }
)

type UserDocument = Document & IUser;
export const UserModel = model<UserDocument>('User',UserSchema);