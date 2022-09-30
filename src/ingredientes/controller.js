const ReceitasRepository = require('../receitas/repositorio-sql');
const IngredientesRepository = require('./repositorio-sql');
const crypto = require('crypto');

class IngredientesController {

    constructor() {
        this.repository = new IngredientesRepository();
        this.receitasRepository = new ReceitasRepository();
    }

    async update(req, res) {

        const { id } = req.params;
        const query = await this.repository.detail(id);
        const ingrediente = query.ing;

        if (!ingrediente) {
            return res.status(400).json({ msg: "ID inválido" });
            
        } else {
            const receita_id = query.ing.receitaId;
            const receita = await this.receitasRepository.detail(receita_id);
            if (receita.rcp.usuarioEmail != req.user.email) {
            return res.status(401).json({ msg: "Você não tem permissão para alterar esse ingrediente" });
            
        } else {

            ingrediente.set({
                texto: req.body.texto
            });

            await ingrediente.save();

            return res.status(200).json({
                ingrediente
            });
        }
      }
    }

    async delete(req, res) {
        const { id } = req.params;
        const query = await this.repository.detail(id);
        const ingrediente = query.ing;

        if (!ingrediente) {
            return res.status(400).json({ msg: "ID inválido" });
            
        } else {
            const receita_id = query.ing.receitaId;
            const receita = await this.receitasRepository.detail(receita_id);
            if (receita.rcp.usuarioEmail != req.user.email) {
            return res.status(401).json({ msg: "Você não tem permissão para deletar esse ingrediente" });
            
        } else {

            ingrediente.destroy();
            return res.status(200).json('');

      }
    }
  }
}


module.exports = IngredientesController;