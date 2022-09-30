const { Receita } = require('./model');
const { Ingrediente } = require('../ingredientes/model');
const Sequelize = require('sequelize');

class ReceitasRepository {
    constructor() {
    }

    async save(rcp) {
        await Receita.create(rcp);
    }

    async detail(id) {
        const rcp = await Receita.findByPk(id);
        const ings = await Ingrediente.findAll({ 
            where: { receitaId: id }
        });

        return {
            rcp, ings
        }
    }

    async list() {
        const listagem = await Receita.findAll();
        return listagem;
    }

    async delete(id) {
        const rcp = await Receita.findByPk(id);
        const ings = await Ingrediente.findAll({
            where: {
                receitaId: id
            }
        });
        
        for (let i = 0; i < ings.length; i++) {
            await ings[i].destroy();
        }
        
        await rcp.destroy();

        return true;
    }

    async deleteIngsFromRcp(rcp) {
        const ings = await Ingrediente.findAll({
            where: {
                receitaId: rcp
            }
        });

        for (let i = 0; i < ings.length; i++) {
            await ings[i].destroy();
        }

        return true;
    }
}

module.exports = ReceitasRepository;