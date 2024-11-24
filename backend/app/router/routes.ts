import { routes } from "./route.data";
import { Request,Response,NextFunction,Application, json } from "express";
import { ResponseHandler } from "../utility/response-handler";

export const registerRoutes = (app : Application) => {
    app.use(json());
    for(let route of routes){
        app.use(route.path,route.router)
    }
    app.use((err:any,req:Request,res:Response,next:NextFunction)=>{
        res.status(err.statusCode||500).send(new ResponseHandler(null,err));
    })
}