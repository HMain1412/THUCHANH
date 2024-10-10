import express from 'express';

const router = express.Router();

// Mảng người dùng (thay thế bằng cơ sở dữ liệu thực tế trong ứng dụng)
const users = [
    { id: 1, username: 'admin', fullname: 'Hồng Yến', address: 'Tiền Giang' },
    { id: 2, username: 'user', fullname: 'User', address: 'Cái Bè' }
];

// Route để hiển thị danh sách người dùng
router.get('/', (req, res) => {
    res.render('userList', { users });
});

// Xem người dùng theo ID
router.get('/view/:id', (req, res) => {
    const userId = req.params.id;
    const user = users.find(u => u.id === parseInt(userId));

    if (user) {
        res.send(`Xem thông tin người dùng: ${user.fullname}, địa chỉ: ${user.address}`);
    } else {
        res.send('Người dùng không tồn tại.');
    }
});

// Route để sửa người dùng theo ID
router.get('/edit/:id', (req, res) => {
    const userId = req.params.id;
    const user = users.find(u => u.id === parseInt(userId));

    if (user) {
        // Giả sử bạn có một form để chỉnh sửa thông tin người dùng
        res.send(`Chỉnh sửa người dùng: ${user.fullname}`);
    } else {
        res.send('Người dùng không tồn tại.');
    }
});

// Route để xóa người dùng theo ID
router.get('/delete/:id', (req, res) => {
    const userId = req.params.id;
    const userIndex = users.findIndex(u => u.id === parseInt(userId));

    if (userIndex !== -1) {
        users.splice(userIndex, 1); // Xóa người dùng khỏi mảng
        res.send('Người dùng đã được xóa.');
    } else {
        res.send('Người dùng không tồn tại.');
    }
});

export default router;
