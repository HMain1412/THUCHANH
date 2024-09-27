import { useState } from 'react';

function Login() {
  // Tạo state cho form inputs
  const [inputs, setInputs] = useState({});

  // Tạo state cho checkbox
  const [isCheck, setCheck] = useState(false);

  // Hàm xử lý khi có thay đổi trong input fields
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  // Hàm xử lý khi checkbox được click
  const handleChecked = () => {
    setCheck(!isCheck);
  };

  // Hàm xử lý khi nhấn nút "Đăng nhập"
  const handleSubmit = (event) => {
    event.preventDefault(); // Ngăn không cho form bị load lại trang
    console.log("Dữ liệu đăng nhập:", inputs);
    console.log("Is Admin?", isCheck);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Enter your username:
        <input
          type="text"
          name="username"
          value={inputs.username || ""}
          onChange={handleChange}
        />
      </label><br />
      
      <label>Enter your password:
        <input
          type="password"
          name="pass"
          value={inputs.pass || ""}
          onChange={handleChange}
        />
      </label><br />
      
      <label>
        <input
          type="checkbox"
          checked={isCheck}
          onChange={handleChecked}
        /> Is Admin?
      </label><br />
      
      <button type="submit">Đăng nhập</button>
    </form>
  );
}

export default Login;
