const { DataTypes, Model } = require('sequelize');

const { sequelizeCon } = require('../config/db-config');
const { Usuario } = require('../usuarios/model');

class Receita extends Model {}
    
Receita.init({
    id: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    nome: DataTypes.STRING,
    descricao: DataTypes.STRING(512),
    modoDeFazer: DataTypes.STRING(1024),
    imagem: DataTypes.STRING(1024),
    usuarioEmail: DataTypes.STRING
}, { 
    sequelize: sequelizeCon,
    modelName: 'receita'
});

Usuario.hasMany(Receita, {
    foreignKey: 'usuarioEmail',
    onDelete: 'CASCADE'
});

Receita.belongsTo(Usuario, 
{
    foreignKey: 'usuarioEmail'
});


module.exports = { Receita };