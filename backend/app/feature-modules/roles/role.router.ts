import { NextFunction, Router, Request,Response } from "express";
import roleService from "./role.service";
import { ResponseHandler } from "../../utility/response-handler";
import { Types } from "mongoose";

const router = Router();

router.post('/',async(req:Request,res:Response,next:NextFunction)=>{
    try{
        const result = await roleService.create(req.body);
        const data = await result.save();
        res.send(new ResponseHandler(result))
    }
    catch(error){
        next(error)
    }
})

router.delete('/:roleId',async(req:Request,res:Response,next:NextFunction)=>{
    try {
        const roleId = req.params.roleId;
        const result = await roleService.deleteRole(new Types.ObjectId(roleId));

        res.send(new ResponseHandler(result))
    } 
    catch (error) {
        next(error)
    }
})

export default router;
