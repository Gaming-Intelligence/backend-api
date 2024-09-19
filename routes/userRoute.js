import express from 'express';
import { saveCoins, saveData, findCoins, findUser, saveTask, findUserDetails, decreaseKeys } from '../controller/userController.js';

const route = express.Router();

route.post("/saveCoins", saveCoins);
route.post("/saveUser", saveData);
route.post("/findCoins", findCoins);
route.post("/findUser", findUser);
route.post("/saveTask", saveTask);
route.post("/findUserDetails", findUserDetails);
route.post("/decreaseKeys", decreaseKeys);


export default route;