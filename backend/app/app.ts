import { connectToMongo } from "./connections/connection";
import express from "express"
import { registerRoutes } from "./router/routes";

export const startServer = async() => {
    try {
        const app = express();
        await connectToMongo();
        registerRoutes(app)
        const {PORT} = process.env;
        app.listen(PORT||3000,()=>console.log(`Listening on port ${PORT||3000}`))
    } 
    catch (error) {
        console.log("Could not start the server");
        process.exit(1);
    }
}