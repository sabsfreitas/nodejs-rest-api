const { DataTypes, Model } = require('sequelize');

const { sequelizeCon } = require('../config/db-config');
const { Receita } = require('../receitas/model');

class Ingrediente extends Model {}
    
Ingrediente.init({
    id: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    texto: DataTypes.STRING
}, { 
    sequelize: sequelizeCon, 
    modelName: 'ingrediente'
});

Receita.hasMany(Ingrediente, 
    {
        foreignKey: 'receitaId',
        onDelete: 'CASCADE'
    });

Ingrediente.belongsTo(Receita,
{
    foreignKey: 'receitaId'
});

sequelizeCon.sync();

module.exports = { Ingrediente };