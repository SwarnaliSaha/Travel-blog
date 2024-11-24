import { connect } from "mongoose";

export const connectToMongo = async()=>{
    try {
        const {MONGO_CONNECTION} = process.env;
        await connect(MONGO_CONNECTION || "");
        console.log("Connection to database is successful");
        return true;
    } 
    catch (error) {
        console.log("Couldn't connect to Mongo");
        throw {message : "Connection error", error : error}
    }
}