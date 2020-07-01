import {Express} from "express";
import UserController from '../controllers/UserController';
const controller= new UserController(); 
const url='/user';    

export const userRoute=(app:Express)=>{     
    app.route(url)
        .post(controller.add)
        .get(controller.get)
        .put(controller.update)

    app.route(`${url}/email/:email`)
    .get(controller.getByEmail);    
    
    app.get(`${url}/email/:email`,controller.getByEmail);
    app.get(`${url}/:_id`,controller.getById);

}