// // controllers/UserController.js
// const User = require('../models/User');

// // Hiển thị danh sách người dùng
// exports.listUsers = (req, res) => {
//   User.findAll()
//     .then(users => res.render('userList', { users }))
//     .catch(err => console.log(err));
// };

// // Xem chi tiết người dùng
// exports.viewUser = (req, res) => {
//   User.findByPk(req.params.id)
//     .then(user => res.render('viewUser', { user }))
//     .catch(err => console.log(err));
// };

// // Trang chỉnh sửa người dùng
// exports.editUser = (req, res) => {
//   User.findByPk(req.params.id)
//     .then(user => res.render('editUser', { user }))
//     .catch(err => console.log(err));
// };

// // Cập nhật thông tin người dùng
// exports.updateUser = (req, res) => {
//   const { username, fullname, address, sex, email } = req.body;
//   User.update(
//     { username, fullname, address, sex, email },
//     { where: { id: req.params.id } }
//   )
//     .then(() => res.redirect('/users'))
//     .catch(err => console.log(err));
// };

// // Xóa người dùng
// exports.deleteUser = (req, res) => {
//   User.destroy({ where: { id: req.params.id } })
//     .then(() => res.redirect('/users'))
//     .catch(err => console.log(err));
// };


// controllers/userController.js
import db from '../db.js'; // Đảm bảo rằng bạn đã có tệp db.js như hướng dẫn ở trên

// Hiển thị danh sách người dùng
export const getUsers = (req, res) => {
  db.query('SELECT * FROM users', (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.render('userList', { users: results });
  });
};

// Thêm người dùng mới
export const addUser = (req, res) => {
  const { username, password, fullname, address, sex, email } = req.body;
  db.query('INSERT INTO users (username, password, fullname, address, sex, email) VALUES (?, ?, ?, ?, ?, ?)', 
  [username, password, fullname, address, sex, email], 
  (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.redirect('/users');
  });
};

// Xem thông tin người dùng
export const viewUser = (req, res) => {
  const userId = req.params.id;
  db.query('SELECT * FROM users WHERE id = ?', [userId], (err, results) => {
    if (err || results.length === 0) {
      return res.status(404).send('Người dùng không tồn tại');
    }
    res.render('userView', { user: results[0] });
  });
};

// Chỉnh sửa thông tin người dùng
export const editUser = (req, res) => {
  const userId = req.params.id;
  const { username, fullname, address, sex, email } = req.body;
  db.query('UPDATE users SET username = ?, fullname = ?, address = ?, sex = ?, email = ? WHERE id = ?', 
  [username, fullname, address, sex, email, userId], 
  (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.redirect('/users');
  });
};

// Xóa người dùng
export const deleteUser = (req, res) => {
  const userId = req.params.id;
  db.query('DELETE FROM users WHERE id = ?', [userId], (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.redirect('/users');
  });
};

