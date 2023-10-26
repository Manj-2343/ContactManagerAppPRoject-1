import {Router,Request,Response} from "express";
import * as contactController from "../Controller/ContactController";
import {body,validationResult} from "express-validator";

const ContactRouter:Router = Router();
/** 
  usage : to get all contacts
  method :GET
  params :no-params(params means form data)
  url :http://localhost:9000/contacts/
  */
 ContactRouter.get("/",async(request:Request,response:Response)=>{
   await contactController.getAllContacts(request,response);
 });
 /** 
  usage : to get a contact by id
  method :GET
  params :no-params(params means form data)
  url :http://localhost:9000/contacts/:id
  */
  ContactRouter.get("/:contactId",async(request:Request,response:Response)=>{
    await contactController.getContact(request,response);
  });
  /**
   * usage : Create the  contacts
     method :POST
     params :name.imageUrl,email.mobile,title,groupId(because of this we use contact:IContact )
     url:http://localhost:9000/contacts/
   */
     ContactRouter.post("/",[
        body("name").not().isEmpty().withMessage("Name is Required"),
        body("imageUrl").not().isEmpty().withMessage("ImageUrl is Required"),
        body("email").not().isEmpty().withMessage("Email is Required"),
        body("company").not().isEmpty().withMessage("Company is Required"),
        body("mobile").not().isEmpty().withMessage("Mobile is Required"),
        body("title").not().isEmpty().withMessage("Title is Required"),
        body("groupId").not().isEmpty().withMessage("groupId is Required"),
     ],async(request:Request,response:Response)=>{
        await contactController.createContact(request,response);
      });
     /**this will be the add + create(contactId:string,contact:IContact)
   * 
*  usage  :Update the  contact
   method :PUT
   params :name.imageUrl,email.mobile,title,groupId
   url :http://localhost:9000/contacts/:contactId
   */ 
   ContactRouter.put("/:contactId",[
    body("name").not().isEmpty().withMessage("Name is Required"),
    body("imageUrl").not().isEmpty().withMessage("ImageUrl is Required"),
    body("email").not().isEmpty().withMessage("Email is Required"),
    body("company").not().isEmpty().withMessage("Company is Required"),
    body("mobile").not().isEmpty().withMessage("Mobile is Required"),
    body("title").not().isEmpty().withMessage("Title is Required"),
    body("groupId").not().isEmpty().withMessage("groupId is Required"),
 ],async(request:Request,response:Response)=>{
    await contactController.updateContact(request,response);
  });
  /**
   * usage :Delete the  contact
   method :DELETE
   params :no-params(params means form data)
   url :http://localhost:9000/contacts/:contactId */
   ContactRouter.delete("/:contactId",async(request:Request,response:Response)=>{
    await contactController.deleteContact(request,response);
  });
export default ContactRouter;