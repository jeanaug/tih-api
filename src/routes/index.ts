import {Express} from 'express';
import {userRoute} from './user';
import {authRoute} from './auth';
import { personRoute } from './person';
import { importPersonRoute } from './import';
import {leadRoute} from './lead'
export const routes=(app:Express) =>{
    userRoute(app);
    authRoute(app);
    personRoute(app);
    importPersonRoute(app);
    leadRoute(app)
} 