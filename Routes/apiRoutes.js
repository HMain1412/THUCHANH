import express from 'express';
import aboutPage from '../Controller/AboutController'
import getHomePage from '../Controller/HomeController'
import getContact from '../Controller/ContactController'
import ApiUserController from '../Controller/ApiController.js';

const router = express.Router();

const initAPIRoute = (app) => {
    //đường dẫn cho API
    router.get('/', getHomePage)
    router.get('/about', aboutPage);  
    router.get('/contact', getContact);
    router.get('/getuser', ApiUserController.getAllUsers);
    router.get('/deltauser/:id', ApiUserController.detailUser);
    router.post('/deleteuser/', ApiUserController.deleteUser)
    router.post('/edituser/', ApiUserController.updateUser)
    router.post('/createnewuser/', ApiUserController.insertUser)
    router.post('/login', ApiUserController.loginUser)
    router.get('/logout', ApiUserController.logoutUser)
    // Gắn router vào ứng dụng Express
    return app.use('/api/v1', router);
};

export default initAPIRoute;