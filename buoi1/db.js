// db.js
import mysql from 'mysql2';

const connection = mysql.createConnection({
  host: 'localhost81', // Địa chỉ máy chủ MySQL
  user: 'root', // Tên người dùng (mặc định là 'root')
  password: '', // Mật khẩu (thường để trống với XAMPP)
  database: 'users', // Tên cơ sở dữ liệu bạn đã tạo
});

// Kết nối đến cơ sở dữ liệu
connection.connect((err) => {
  if (err) {
    console.error('Lỗi kết nối đến cơ sở dữ liệu:', err);
    return;
  }
  console.log('Đã kết nối đến cơ sở dữ liệu MySQL!');
});

export default connection;
