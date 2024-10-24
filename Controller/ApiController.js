import express from "express";
import userModel from '../Models/userModel';
import bcrypt from 'bcryptjs'

const getAllUsers = async (req, res) => {
  let users = await userModel.getAllUser();
  return res.status(200).json({
    errCode: 1,
    message: "Success",
    users: users
  })
}
const detailUser = async (req, res) => {
  let data = await userModel.getUserById(req.params.id);
  return res.status(200).json({
    errCode: 1,
    message: "Success",
    deltaUser: data
  })
}
const deleteUser = async (req, res) => {
  let { id } = req.body; // Lấy id từ req.body

  try {
      // Gọi hàm xóa người dùng bằng id
      await userModel.deleteUserbyID(id);
      return res.status(200).json({
          errCode: 0, 
          message: "Xóa người dùng thành công",
          id 
      })
  } catch (error) {
      // Nếu có lỗi xảy ra, trả về lỗi
      return res.status(500).json({
          errCode: 1,
          message: "Có lỗi xảy ra khi xóa người dùng",
          error: error.message 
      })
  }
}
const updateUser = async (req, res) => {
  const { id, username, password, fullname, address, sex, email } = req.body;

  // Kiểm tra xem có id hay không
  if (!id) {
      return res.status(400).json({
          errCode: 1,
          message: "ID là bắt buộc để cập nhật người dùng",
      });
  }
  try {
      // Gọi hàm cập nhật người dùng bằng id và các thông tin khác
      const result = await userModel.updateUser(id, username, password, fullname, address, sex, email);

      // Kiểm tra xem có cập nhật thành công không (nếu hàm updateUser trả về kết quả)
      if (result) {
          return res.status(200).json({
              errCode: 0, 
              message: "Cập nhật người dùng thành công",
              id 
          });
      } else {
          //Báo lỗi nếu không có bản ghi nào được cập nhật
          return res.status(404).json({
              errCode: 1,
              message: "Không tìm thấy người dùng với ID đã cho",
          });
      }
  } catch (error) {
      // Trả về lỗi nếu có lỗi xảy ra
      return res.status(500).json({
          errCode: 1,
          message: "Có lỗi xảy ra khi cập nhật người dùng",
          error: error.message 
      });
  }
}

const insertUser = async (req, res) => {
    const { username, password, fullname, address, sex, email } = req.body;

    // Kiểm tra xem các trường quan trọng có tồn tại không
    if (!username || !password || !email) {
        return res.status(400).json({
            errCode: 1,
            message: "Username, password và email là bắt buộc.",
        });
    }

    try {
        // Kiểm tra xem username hoặc email đã tồn tại chưa
        const isUsernameExist = await userModel.isUserExist(username);
        const isEmailExist = await userModel.isEmailExist(email);

        if (isUsernameExist || isEmailExist) {
            return res.status(409).json({ 
                errCode: 1,
                message: "Username hoặc email đã tồn tại.",
            });
        }

        // Thêm người dùng mới vào cơ sở dữ liệu
        const newUser = await userModel.insertUser(
            username, password, fullname, address, sex, email
        );

        return res.status(201).json({ 
            errCode: 0,
            message: "Thêm người dùng thành công.",
        });
    } catch (error) {
        // Xử lý lỗi nếu có
        return res.status(500).json({
            errCode: 1,
            message: "Có lỗi xảy ra khi thêm người dùng.",
            error: error.message,
        });
    }
};

const loginUser = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await userModel.getUserByUsername(username);
        if (!user) {
            return res.status(409).json({ 
                errCode: 1,
                message: "Tài khoản và mật khẩu không đúng.",
            });
        }
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(409).json({ 
                errCode: 1,
                message: "Tài khoản và mật khẩu không đúng.",
            });
        }
        // Chỉ lưu username và fullname vào session
        req.session.user = {
            username: user.username,   
            fullname: user.fullname,     
            role: user.role
        };
        res.redirect('/'); // Hướng về trang chính
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).send('Internal Server Error');
    }
};
const logoutUser = (req, res) => {
    req.session.destroy(err => {
        if (err) {
            console.error("Error destroying session:", err);
            return res.status(500).json({
                errCode: 1,
                message: "Có lỗi xảy ra khi đăng xuất.",
            });
        }
        res.clearCookie('connect.sid'); // Xóa cookie phiên
        return res.status(200).json({
            errCode: 0,
            message: "Đăng xuất thành công.",
        });
    });
};


export default { getAllUsers, detailUser, deleteUser, updateUser, insertUser, loginUser, logoutUser};
