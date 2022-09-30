const ReceitasRepository = require('./repositorio-sql');
const IngredientesRepository = require('../ingredientes/repositorio-sql');
const crypto = require('crypto');

class ReceitasController {

    constructor() {
        this.repository = new ReceitasRepository();
        this.ingredientesRepository = new IngredientesRepository();
    }

    async create(req, res) {
        const rcp = {  
            id: crypto.randomUUID(),
            nome: req.body.rcp.nome,
            descricao: req.body.rcp.descricao,
            modoDeFazer: req.body.rcp.modoDeFazer,
            imagem: req.body.rcp.imagem,
            usuarioEmail: req.user.email
        };

        const ings = {  
            ingredientes: req.body.ing.ingredientes
        };

        await this.repository.save(rcp);

        console.log(ings);

        for (let i = 0; i < ings.ingredientes.length; i++) {
            console.log(crypto.randomUUID());
            let ing = {
                id: crypto.randomUUID(),
                texto: ings.ingredientes[i].texto,
                receitaId: rcp.id
            }

            await this.ingredientesRepository.save(ing);

        }
        
        return res.json({
            rcp, ings
        });
    }

    async list(req, res) {
        //const receita = req.query.receita.toUpperCase();
        const listagem = await this.repository.list();
        console.log(listagem);
        return res.json(listagem);
    }

    async detail(req, res) {
        const { id } = req.params;
        const receita = await this.repository.detail(id);
        if(!receita.rcp || !receita.ings) {
            return res.status(404).json({ msg: "Esse ID não existe."});
        }
        return res.json(receita);
    }

    async update(req, res) {

        const { id } = req.params;
        const query = await this.repository.detail(id);
        const receita = query.rcp;

        if (!receita) {
            return res.status(400).json({ msg: "ID inválido" });
        } else if (receita.usuarioEmail != req.user.email) {
            return res.status(401).json({ msg: "Você não tem permissão para alterar essa receita" });
        } else {
            console.log(id);
            await this.repository.deleteIngsFromRcp(id);

            receita.set({
                nome: req.body.rcp.nome,
                descricao: req.body.rcp.descricao,
                modoDeFazer: req.body.rcp.modoDeFazer,
                imagem: req.body.rcp.imagem
            });

            await receita.save();

            const ings = {  
                ingredientes: req.body.ing.ingredientes
            };

            let ingredientes = [];

            for (let i = 0; i < ings.ingredientes.length; i++){

                let ing = {
                    id: crypto.randomUUID(),
                    texto: ings.ingredientes[i].texto,
                    receitaId: id
                }
    
                await this.ingredientesRepository.save(ing);

                ingredientes.push(ing);
    
            }

            return res.status(200).json({
                receita, ingredientes
            });
        }
        
    }

    async delete(req, res) {
        const { id } = req.params;
        const query = await this.repository.detail(id);
        const receita = query.rcp;

        if (!query.rcp) {
            return res.status(400).json({ msg: "ID inválido"});
        } else if (receita.usuarioEmail != req.user.email) {
            return res.status(401).json({ msg: "Você não tem permissão para deletar essa receita" });
        } else {
            await this.repository.delete(id);
            return res.status(200).json('');
        }
    }
}

module.exports = ReceitasController;