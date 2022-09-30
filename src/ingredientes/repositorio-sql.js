const { Ingrediente } = require('./model');
const Sequelize = require('sequelize');

class IngredientesRepository {
    constructor() {
    }

    async save(ing) {
        await Ingrediente.create(ing);
    }

    async detail(id) {
        const ing = await Ingrediente.findByPk(id);

        return {
            ing
        }
    }

}

module.exports = IngredientesRepository;