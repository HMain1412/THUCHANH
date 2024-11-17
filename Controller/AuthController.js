import express from "express";
import userModel from '../Models/userModel';  // Import model để xử lý với CSDL hoặc logic nghiệp vụ
import bcrypt from 'bcryptjs';
import jwt  from 'jsonwebtoken';
import dotenv from 'dotenv/config';

const sessionMiddleware = (req, res, next) => {
    // Gán thông tin session vào res.locals
    res.locals.session = req.session;
    next();
};

const getLoginPage = (req, res) => {
    return res.render("home", { data: { title: 'Login page', page: "login", content: 'Đây là Đăng nhập' } });
};

const loginUser = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await userModel.getUserByUsername(username);
        if (!user) {
            return res.render('home', {
                title: 'Login',
                data: { page: 'login', error: 'Tên người dùng hoặc mật khẩu không đúng.' }
            });
        }

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.render('home', {
                title: 'Login',
                data: { page: 'login', error: 'Tên người dùng hoặc mật khẩu không đúng.' }
            });
        }

        // Chỉ lưu username và fullname vào session
        req.session.user = {
            username: user.username,   // Giả sử username có trong user
            fullname: user.fullname,     // Giả sử fullname có trong user
            role: user.role
        };

        res.redirect('/'); // Chuyển hướng về trang chính
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).send('Internal Server Error');
    }
};

const getLogoutPage = (req, res) => {
    req.session.destroy(err => {
        if (err) {
            console.error("Error destroying session:", err);
            return res.redirect('/'); // Quay về trang chính nếu có lỗi
        }
        res.clearCookie('connect.sid'); // Xóa cookie phiên
        res.redirect('/');
    });
};

const authMiddleware = (req, res, next) => {
    if (!req.session.user) {
        return res.redirect('/login'); // Chuyển hướng đến trang đăng nhập nếu chưa đăng nhập
    }
    next();
};

const adminMiddleware = (req, res, next) => {
    if (req.session.user.role !== 'admin') {
        return res.status(403).send('Access denied'); // Trả về lỗi 403 nếu không phải là admin
    }
    next();
};

const userMiddleware = async (req, res, next) => {
    const id = req.params.id || req.body.id;
    const sessionUser = req.session.user; // Lấy thông tin user từ session

    try {
        // Lấy thông tin username từ CSDL theo id
        const user = await userModel.getUserById(id);

        if (!user) {
            return res.status(404).send('User not found.'); // Trả về lỗi nếu không tìm thấy user
        }

        // Nếu là admin, cho phép thực hiện mọi thao tác
        if (sessionUser.role === 'admin') {
            return next();
        }

        // Nếu là user, chỉ cho phép thao tác trên tài khoản của chính mình
        if (sessionUser.role === 'user' && sessionUser.username !== user.username) {
            return res.status(403).send('Access denied. Bạn chỉ có thể thao tác trên tài khoản của mình.');
        }

        next(); // Tiếp tục nếu quyền hợp lệ
    } catch (error) {
        console.error('Error in access control:', error);
        res.status(500).send('Internal Server Error');
    }
};

const createJWT = (payload) => {
    const key = process.env.JWT_SECRET;
    try {
        return jwt.sign(payload, key);
    } catch (err) {
        console.error('Error creating JWT:', err);
        return null;
    }
};

const verifyToken = (token) => {
    const key = process.env.JWT_SECRET;
    try {
        return jwt.verify(token, key);
    } catch (err) {
        console.error('Error verifying JWT:', err);
        return null;
    }
};

const handleLogin = async (req, res) => {
    const { username, password } = req.body; // Lấy thông tin đăng nhập từ request body

    if (!username || !password) {
        return res.status(400).json({ message: 'Missing username or password' });
    }

    try {
        // Tìm user trong cơ sở dữ liệu theo username
        const user = await userModel.getUserByUsername(username); 
        if (!user) {
            return res.status(409).json({ 
                errCode: 1,
                message: "Tài khoản và mật khẩu không đúng.",
            });
        }

        // Kiểm tra mật khẩu của user
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(409).json({
                errCode: 1,
                message: "Tài khoản và mật khẩu không đúng.",
            });
        }

        // Nếu mật khẩu đúng, tạo JWT token
        const payload = { userId: user.id, username: user.username, role: user.role, fullname: user.fullname };

        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Gửi token dưới dạng cookie
        res.cookie('jwt', token, {
            httpOnly: true,
            path: '/'
        });

        return res.status(200).json({ message: 'Login successful' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};



// Handle Logout
const handleLogout = (req, res) => {
    res.clearCookie('jwt', {path: "/", httpOnly: true}); // Xóa cookie chứa token
    return res.status(200).json({
        errCode: 1,
        message: "Đăng xuất thành công.",
    });
};

// Handle Get Account Info
const handleGetAccount = (req, res) => {
    let token = req.cookies.jwt
    let decoded = verifyToken(token)
    if(decoded){
        return res.status(200).json({
            err: 1,
            message: 'Thanh cong',
            data: {
                user: decoded.username,
                fullname: decoded.fullname
            }
        })
    }
    return res.status(200).json({
        err: 0,
        message: 'Error: '
    })
};



const cl_authMiddleware = (req, res, next) => {
    const token = req.cookies.jwt; // Get token from cookies

    if (!token) {
        return res.redirect('/login'); // Redirect to login if no token is provided
    }

    const decoded = verifyToken(token); // Decode the token

    if (!decoded) {
        return res.status(401).send('Unauthorized'); // If token is invalid, send 401 Unauthorized
    }

    req.user = decoded; // Save decoded token information to the request object
    next(); // Continue to the next middleware
};
const cl_userMiddleware = async (req, res, next) => {
    const username = req.params.username; // Get the username from the URL parameter
    const tokenUser = req.user.username; // Get the username from the decoded token

    try {
        // If the user is an admin, allow access to all users
        if (req.user.role === 'admin') {
            return next();
        }

        // Check if the token username matches the username in the URL
        if (username !== tokenUser) {
            return res.status(403).send('Access denied. Bạn chỉ có thể thao tác trên tài khoản của mình.');
        }

        // Proceed if the username matches
        next();
    } catch (error) {
        console.error('Error in user access control:', error);
        res.status(500).send('Internal Server Error');
    }
};







export { 
    sessionMiddleware, 
    getLoginPage, 
    loginUser, 
    getLogoutPage, 
    authMiddleware, 
    adminMiddleware, 
    userMiddleware, 
    createJWT, 
    verifyToken, 
    handleLogin, 
    handleLogout, 
    handleGetAccount,
    cl_userMiddleware,
    cl_authMiddleware
};
