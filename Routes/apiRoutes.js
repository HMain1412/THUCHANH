import express from 'express';
import aboutPage from '../Controller/AboutController'
import getHomePage from '../Controller/HomeController'
import getContact from '../Controller/ContactController'
import ApiController from '../Controller/ApiController.js';
import CategoryController from '../Controller/CategoryController.js';
import ProductController from '../Controller/ProductController.js';
import { sessionMiddleware, getLoginPage, loginUser, getLogoutPage, authMiddleware, adminMiddleware, userMiddleware, handleGetAccount, handleLogin, handleLogout, cl_userMiddleware, cl_authMiddleware } from '../Controller/AuthController.js';
const router = express.Router();

const initAPIRoute = (app) => {
    // Định nghĩa các route (đường dẫn) cho API
    router.get('/', getHomePage)
    router.get('/about', aboutPage);  // Gọi controller xử lý route
    router.get('/contact', getContact);
    router.get('/getuser', authMiddleware, ApiController.getAllUsers);
    router.get('/deltauser/:id', authMiddleware, userMiddleware, ApiController.detailUser);
    router.post('/deleteuser/', authMiddleware, userMiddleware, ApiController.deleteUser)
    router.post('/edituser/', authMiddleware, userMiddleware, ApiController.updateUser)
    router.post('/createnewuser/', authMiddleware, adminMiddleware, ApiController.insertUser)



    router.post('/login', handleLogin)
    router.get('/logout', handleLogout)
    router.get('/account', handleGetAccount)
    router.get('/deltauserbyusername/:username', cl_authMiddleware, cl_userMiddleware, ApiController.detailUserbyUsername)
    

    router.get('/category', CategoryController.getAllNhom)
    router.get('/productbycategory/:id', CategoryController.getAllNhom)
    router.get('/product', ProductController.getAllSanPham)
    router.get('/deltaproduct/:id', ProductController.deltaSanpham);
    router.get('/getproductbycategory/:id', ProductController.getSanPhamBynhom);
    // Gắn router vào ứng dụng Express
    return app.use('/api/v1', router);
};

export default initAPIRoute;