import { Sequelize, DataTypes } from 'sequelize'; // Sequelize và DataTypes
import mysql from 'mysql2'
// Kết nối Sequelize
const sequelize = new Sequelize('usersmot', 'root', '', {
    host: 'localhost',
    dialect: 'mysql', // 
});

export { sequelize, DataTypes };  
