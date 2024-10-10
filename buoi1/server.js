// import express from 'express';
// import dotenv from 'dotenv/config';
// import viewEngine from './viewEngine.js'; 
// import { getPath, getParamsURL } from './getURL.js'; 







// const app = express();
// const port = process.env.PORT || 3000;


// viewEngine(app);


// function getCurrentDate() {
//     return new Date().toString();
// }

// // Routes
// app.get('/ejs', (req, res) => {
//     res.render('test'); 
// });

// app.get('/', (req, res) => {
//   res.render('home'); 
// });


// app.get('/about', (req, res) => {
//   res.render('about'); 
// });
// app.get('/contact', (req, res) => {
//     res.render('contact'); 
//   });


//   app.get('/users', (req, res) => {
//     // Đây là ví dụ đơn giản về danh sách người dùng
//     const users = [
//         { username: 'admin', fullname: 'Hồng Yến', address: 'Tiền Giang' },
//         { username: 'user', fullname: 'User', address: 'Cái Bè' }
//     ];

//     // Render ra file userList.ejs và truyền dữ liệu người dùng
//     res.render('userList', { users });
// });




// app.get('/', (req, res) => {
//     res.send('Hello world!');
// });

// // app.get('/about', (req, res) => {
// //     res.send('Hello world! Page about');
// // });

// app.get('/date', (req, res) => {
//     res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
//     res.write(getCurrentDate() + "<br/>");
//     res.end();
// });

// app.get('/geturl', (req, res) => {
//     const path = getPath(req);
//     const params = getParamsURL(req);
//     res.send(`Path: ${path} <br/> Params: ${params}`);
// });

// app.listen(port, () => {
//     console.log(`Example app listening on port ${port}`);
// });




import express from 'express';
import dotenv from 'dotenv/config';
import viewEngine from './viewEngine.js';
import { getPath, getParamsURL } from './getURL.js';
import userRoutes from './Routes/userRoutes.js'; // Import user routes


const app = express();
const port = process.env.PORT || 3000;

viewEngine(app);

function getCurrentDate() {
    return new Date().toString();
}

// Routes
app.get('/ejs', (req, res) => {
    res.render('test');
});

app.get('/', (req, res) => {
    res.render('home');
});

app.get('/about', (req, res) => {
    res.render('about');
});

app.get('/contact', (req, res) => {
    res.render('contact');
});

// Sử dụng userRoutes cho route /users
app.use('/users', userRoutes);

app.get('/date', (req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.write(getCurrentDate() + "<br/>");
    res.end();
});

app.get('/geturl', (req, res) => {
    const path = getPath(req);
    const params = getParamsURL(req);
    res.send(`Path: ${path} <br/> Params: ${params}`);
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
