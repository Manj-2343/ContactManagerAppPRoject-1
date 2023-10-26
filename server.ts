import express,{Application,Request,Response} from 'express';
import dotenv from "dotenv"
import { DBUtils } from './Util/DBUtils';
import ContactRouter from './Router/ContactRouter';
import GroupRouter from './Router/GroupRouter';


// to initialize the express server
const app:express.Application = express();

//configure express to receive the form data
app.use(express.json());

//configure the dot-env
dotenv.config({
    path:"./.env",
})


const port :string| number = process.env.PORT || 9999;
const dbUrl:string|undefined = process.env.MONGO_DB_CLOUD_URL;
const dbName:string|undefined = process.env.MONGO_DB_DATABASE

app.get("/",(request:express.Request,response:express.Response)=>{
    response.status(200);     
    response.json({
        msg:"welcome to express server"
    });
});
//configure the ROuter
app.use("/contacts",ContactRouter);
app.use("/groups",GroupRouter);

if(port){
    app.listen(Number(port),()=>{
        //connect to the database
        if(dbUrl && dbName){
            DBUtils.connectToDB(dbUrl,dbName).then((dbResponse:string)=>{
              console.log(dbResponse);
            }).catch((error)=>{
                console.log(error);
                process.exit(1);//force to stop the express server
            })
        }
        console.log(`Express Server is Started at ${port}`);
        })
}
