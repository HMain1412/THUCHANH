import express from 'express'
import { default as date } from '../date'; 
import getURL from '../getURL';
import getHomePage from '../Controller/HomeController';
import getAbout from '../Controller/AboutController';
import getContact from '../Controller/ContactController';
import { getAllUser } from '../Controller/UserController'; 
import { viewUser } from '../Controller/UserController'; 
import { deleteUser } from '../Controller/UserController'; 
import { editUser } from '../Controller/UserController'; 
import { updateUser } from '../Controller/UserController'; 
import { createUser } from '../Controller/UserController'; 
import { insertUser } from '../Controller/UserController'; 
const router = express.Router()
const initWebRoute = (app) => {
    router.get('/', getHomePage)
    router.get('/About', getAbout)
    router.get('/Contact', getContact)
    router.get('/getuser', getAllUser); 
    router.get('/deltauser/:id', viewUser); 
    router.post('/deleteuser/', deleteUser) 
    router.get('/edituser/:id', editUser); 
    router.post('/edituser/', updateUser) 
    router.get('/createnewuser/', createUser);
    router.post('/createnewuser/', insertUser) 
    router.get('/date', (req, res) => {
        res.status(200).set({ 'Content-Type': 'text/html; charset=utf-8' });
        res.send(`${date()}`);
    });
    router.get('/geturl', (req, res) => {
        res.status(200).set({ 'Content-Type': 'text/html; charset=utf-8' });
        res.write(`${getURL_ES6.getPath(req)}<br/>`);
        res.write(`${getURL_ES6.getParamesURL(req)}<br/>`);
    });

    return app.use('/', router)
}
export default initWebRoute


