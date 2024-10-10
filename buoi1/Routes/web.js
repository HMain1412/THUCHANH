const express = require('express');
const router = express.Router();
const HomeController = require('../controllers/HomeController');
const AboutController = require('../controllers/AboutController');
const ContactController = require('../controllers/ContactController');
const UserController = require('../controllers/UserController');

// Trang chính
router.get('/', HomeController.index);

// Trang About
router.get('/about', AboutController.index);

// Trang Contact
router.get('/contact', ContactController.index);

// Quản lý người dùng
router.get('/users', UserController.listUsers);  // Hiển thị danh sách người dùng
router.get('/users/view/:id', UserController.viewUser);  // Xem chi tiết người dùng
router.get('/users/edit/:id', UserController.editUser);  // Trang sửa thông tin người dùng
router.post('/users/edit/:id', UserController.updateUser);  // Cập nhật thông tin người dùng
router.get('/users/delete/:id', UserController.deleteUser);  // Xóa người dùng

module.exports = router;
