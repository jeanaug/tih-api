import {Express,Request,Response} from 'express';
import AuthController from '../controllers/AuthController'
const authetication = new AuthController();

export const authRoute = (app:Express)=>{
    app.post('/authenticate',async( req:Request,res:Response)=>{
        authetication.authenticate(req,res);
    });
}