import mongoose from "mongoose"

export interface IRole{
    _id:string,
    name:string
}
export const Roles = {
    admin:new mongoose.mongo.ObjectId("6743072060e4eeb133a41075"),
    user:new mongoose.mongo.ObjectId("6743072860e4eeb133a41078"),
}