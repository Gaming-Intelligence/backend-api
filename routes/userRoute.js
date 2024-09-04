import express from 'express';
import { allUsers, saveData, findCoins } from '../controller/userController.js';

const route = express.Router();

route.get("/getAllUsers", allUsers);
route.post("/saveUser", saveData);
route.post("/findCoins", findCoins);


export default route;