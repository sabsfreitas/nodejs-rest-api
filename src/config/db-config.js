const { Sequelize } = require('sequelize');

const sequelizeCon = new Sequelize('postgres://lebtqfsdwiinxm:d2314938b24cb88837de39273e964f1655dfe69882a2559e3352bbdabe695161@ec2-18-214-35-70.compute-1.amazonaws.com:5432/d4e4pdd3iduipe', {
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    },
});

sequelizeCon
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.log('Unable to connect to the database:', err);
});

module.exports = { sequelizeCon };