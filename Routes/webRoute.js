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
import ProductController from '../Controller/ProductController';
import CategoryController from '../Controller/CategoryController';
import { sessionMiddleware, getLoginPage, loginUser, getLogoutPage, authMiddleware, adminMiddleware, userMiddleware } from '../Controller/AuthController';
const router = express.Router()
const initWebRoute = (app) => {
    router.get('/', getHomePage)
    router.get('/About', getAbout)
    router.get('/Contact', getContact)
    router.get('/login', getLoginPage)
    router.post('/login', loginUser)
    router.get('/logout', getLogoutPage)
    router.get('/product', ProductController.getAllProduct)
    router.get('/deltaproduct/:id', ProductController.deltaProduct)
    router.get('/category', CategoryController.getAllCategory)


    router.get('/getuser', authMiddleware, getAllUser)
    router.get('/deltauser/:id', authMiddleware, userMiddleware, viewUser)
    router.post('/deleteuser/', authMiddleware, userMiddleware, deleteUser)
    router.get('/edituser/:id', authMiddleware, userMiddleware, editUser)
    router.post('/edituser/', authMiddleware, userMiddleware, updateUser)
    router.get('/createnewuser/', authMiddleware, adminMiddleware, createUser)
    router.post('/createnewuser/', authMiddleware, adminMiddleware, insertUser)
    router.get('/date', (req, res) => {
        res.status(200).set({ 'Content-Type': 'text/html; charset=utf-8' });
        res.send(`${date()}`);
    });
    router.get('/geturl', (req, res) => {
        res.status(200).set({ 'Content-Type': 'text/html; charset=utf-8' });
        res.write(`${getURL_ES6.getPath(req)}<br/>`);
        res.write(`${getURL_ES6.getParamesURL(req)}<br/>`);
    });
    app.use(sessionMiddleware);
    return app.use('/', router)
}
export default initWebRoute


