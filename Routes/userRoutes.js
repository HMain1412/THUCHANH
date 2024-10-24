import express from 'express';
import pool from '../configs/db'; // Kết nối MySQL

const router = express.Router();

// Hiển thị danh sách người dùng
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM users');
    res.render('userList', { users: rows });
  } catch (error) {
    res.status(500).send('Lỗi truy vấn cơ sở dữ liệu');
  }
});

// Xem thông tin người dùng theo ID
router.get('/view/:id', async (req, res) => {
  const userId = req.params.id;
  try {
    const [rows] = await pool.query('SELECT * FROM users WHERE id = ?', [userId]);
    if (rows.length > 0) {
      const user = rows[0];
      res.send(`Xem thông tin người dùng: ${user.fullname}, địa chỉ: ${user.address}`);
    } else {
      res.send('Người dùng không tồn tại.');
    }
  } catch (error) {
    res.status(500).send('Lỗi truy vấn cơ sở dữ liệu');
  }
});

// Sửa thông tin người dùng
router.get('/edit/:id', async (req, res) => {
  const userId = req.params.id;
  try {
    const [rows] = await pool.query('SELECT * FROM users WHERE id = ?', [userId]);
    if (rows.length > 0) {
      const user = rows[0];
      // Giả sử bạn có một form để chỉnh sửa thông tin người dùng
      res.render('editUser', { user });
    } else {
      res.send('Người dùng không tồn tại.');
    }
  } catch (error) {
    res.status(500).send('Lỗi truy vấn cơ sở dữ liệu');
  }
});

// Cập nhật thông tin người dùng
router.post('/edit/:id', async (req, res) => {
  const userId = req.params.id;
  const { fullname, address } = req.body;
  try {
    await pool.query('UPDATE users SET fullname = ?, address = ? WHERE id = ?', [fullname, address, userId]);
    res.redirect('/users');
  } catch (error) {
    res.status(500).send('Lỗi cập nhật người dùng.');
  }
});

// Xóa người dùng
router.get('/delete/:id', async (req, res) => {
  const userId = req.params.id;
  try {
    await pool.query('DELETE FROM users WHERE id = ?', [userId]);
    res.send('Người dùng đã được xóa.');
  } catch (error) {
    res.status(500).send('Lỗi khi xóa người dùng.');
  }
});

export default router;
