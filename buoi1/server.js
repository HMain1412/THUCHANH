import express from 'express';
import dotenv from 'dotenv/config';
import viewEngine from './viewEngine.js'; 
import { getPath, getParamsURL } from './getURL.js'; 

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


app.get('/', (req, res) => {
    res.send('Hello world!');
});

// app.get('/about', (req, res) => {
//     res.send('Hello world! Page about');
// });

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
