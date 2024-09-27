// import logo from './logo.svg';
// import './App.css';

// function App() {

//   return (
//     <div className="App">

//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>

//           Edit <code>src/App.js</code> and save to reload.

//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>

//     </div>
//   );
// }

// export default App;










// import './App.css';

// import React from 'react';
// import Menu from './containers/Menu';
// import Information from './containers/Information';
// import Button from './containers/Button';

// function App() {
//   const userName = "Nguyễn Văn B"; // Thông tin người dùng
//   const isLogin = false; // Trạng thái đăng nhập

//   return (
//     <div>
//       {/* Gọi component Menu */}
//       <Menu />

//       {/* Gọi component Information và truyền thông tin người dùng */}
//       <Information userName={userName} />

//       {/* Gọi component Button */}
//       <Button />

//       {/* Kiểm tra trạng thái đăng nhập */}
//       {!isLogin && <p>Chưa đăng nhập</p>}
//     </div>
//   );
// }

// export default App;

import React from 'react';
import Hello from './containers/Hello'; // Import component Hello
import Car from './containers/Car'; // Import component Car
import Login from './containers/Login'; // Import component Login

function App() {
  return (
    <div className="App">
      <Hello /> {/* Gọi component Hello */}
      <Car /> {/* Gọi component Car */}
      <Login /> {/* Gọi component Login */}
    </div>
  );
}

export default App;


