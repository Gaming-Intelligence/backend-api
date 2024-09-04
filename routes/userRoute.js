import express from 'express';
import { allUsers, saveData } from '../controller/userController.js';

const route = express.Router();

route.get("/getAllUsers", allUsers);
route.post("/saveUser", saveData);

export default route;