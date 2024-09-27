import { createBrowserRouter } from 'react-router-dom';
import App from '../App'; // Đường dẫn tới file App.js
import Login from './Login'; // Đường dẫn tới file Login.js
import Car from './Car'; // Đường dẫn tới file Car.js
import Hello from './Hello'; // Đường dẫn tới file Hello.js

// Tạo router với các route tương ứng
export const router = createBrowserRouter([
  {
    path: "/", // Route 1: Trang chủ
    element: <App />
  },
  {
    path: "/login", // Route 2: Đường dẫn đến trang Login
    element: <Login />
  },
  {
    path: "/car", // Route 3: Đường dẫn đến trang Car
    element: <Car />
  },
  {
    path: "/hello", // Route 4: Đường dẫn đến trang Hello
    element: <Hello />
  },
  {
    path: "*", // Route 5: Xử lý khi đường dẫn không tồn tại
    element: <div>Không tìm thấy web theo yêu cầu</div>
  }
]);
