import {Router,Request,Response} from "express";
import * as groupController from "../Controller/GroupController"
import { body } from "express-validator";


const GroupRouter:Router = Router();
/** 
  usage : to get all groups
  method :GET
  params :no-params(params means form data)
  url :http://localhost:9000/groups/
  */
  GroupRouter.get("/",async(request:Request,response:Response)=>{
    await groupController.getAllGroups(request,response);
  });
/** 
  usage : create group
  method :POST
  params :name
  url :http://localhost:9000/groups/
  */
  GroupRouter.post("/",[
    body("name").not().isEmpty().withMessage("Name is Required")
  ],async(request:Request,response:Response)=>{
    await groupController.createGroup(request,response);
  });
  /** 
  usage : to get group
  method :GET
  params :no-params(params means form data)
  url :http://localhost:9000/groups/:groupId
  */
   GroupRouter.get("/:groupId",async(request:Request,response:Response)=>{
     await groupController.getGroup(request,response);
   });


export default GroupRouter;