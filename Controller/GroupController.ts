import {Request,Response} from "express";
import { App_Status } from "../Constant/Constant";
import { validationResult } from "express-validator";
import GroupsTable from "../Database/GroupSchema";
import { IGroup } from "../Model/IGroup";
import mongoose from "mongoose";
/** 
  usage : to get all groups
  method :GET
  params :no-params(params means form data)
  url :http://localhost:9999/groups/
  */

  export const getAllGroups=async(request:Request,response:Response)=>{
    try{
let groups:IGroup[] |undefined =await GroupsTable.find();
if(groups){
  return response.status(200).json({
    statusbar:App_Status.Success,
    data:groups,
    msg:""
  });
}
    }     
    catch(error:any){
     return response.status(500).json({
         status:App_Status.Failed,
         data:null,
         error:error.message
     });
    }
}
/** 
  usage : to Create groups
  method :POST
  params :name
  url :http://localhost:9999/groups/
  */

  export const createGroup=async(request:Request,response:Response)=>{
    const errors = validationResult(request);
    if(!errors.isEmpty()){
      return response.status(400).json({errors:errors.array()});
    }
    try{
let {name} = request.body;
// check the name is already exists
let group:IGroup | null| undefined = await GroupsTable.findOne({name:name});
if(group){
  return response.status(500).json({
    status:App_Status.Failed,
    data:null,
    error:"Name is Already Exits"
});
}
let theGroup:IGroup|null|undefined = await new GroupsTable({name}).save();
if(theGroup){
  return response.status(200).json({
    statusbar:App_Status.Success,
    data:theGroup,
    msg:"Group Is Created"
  });
}
    }     
    catch(error:any){
     return response.status(500).json({
         status:App_Status.Failed,
         data:null,
         error:error.message
     });
    }
}

/** 
  usage : to get group
  method :GET
  params :no-params(params means form data)
  url :http://localhost:9000/groups/:groupId
  */

  export const getGroup=async(request:Request,response:Response)=>{
    try{
let {groupId} = request.params;
const mongoGroupId = new mongoose.Types.ObjectId(groupId);
let theGroup:IGroup|undefined |null = await GroupsTable.findById(mongoGroupId);
if(!theGroup){
   return response.status(404).json({
    statusbar:App_Status.Failed,
    data:null,
    error:"NO Group is Found"
   })
}
return response.status(200).json({
  status:App_Status.Success,
  data:theGroup,
  msg:""
})
    }     
    catch(error:any){
     return response.status(500).json({
         status:App_Status.Failed,
         data:null,
         error:error.message
     });
    }
}