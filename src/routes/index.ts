import {Express} from 'express';
import {userRoute} from './user';
import {authRoute} from './auth';

export const routes=(app:Express) =>{
    userRoute(app);
    authRoute(app);
} 