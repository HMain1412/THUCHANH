import express from 'express'
import dotenv from 'dotenv/config'
import viewEngine from './viewEngine';  
import initWebRoute from './Routes/webRoute';
import path from 'path'
const app = express()
const port=process.env.PORT
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
viewEngine(app);
app.use('/static', express.static(path.join(__dirname, 'public')))
initWebRoute(app)
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})