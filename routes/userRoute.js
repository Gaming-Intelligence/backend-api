import express from 'express';
import { saveCoins, saveData, findCoins } from '../controller/userController.js';

const route = express.Router();

route.post("/saveCoins", saveCoins);
route.post("/saveUser", saveData);
route.get("/findCoins", findCoins);
route.post("/registerUsingLink", registerUsingLink);


export default route;