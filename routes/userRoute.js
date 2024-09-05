import express from 'express';
import { allUsers, saveData, findCoins } from '../controller/userController.js';

const route = express.Router();

route.post("/getAllUsers", allUsers);
route.post("/saveUser", saveData);
route.get("/findCoins", findCoins);


export default route;