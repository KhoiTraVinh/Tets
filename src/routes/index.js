import express from 'express';
export const Routes = express();
import {UserRouter} from './userrouter.js';



Routes.use('/user', UserRouter);