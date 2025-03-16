const { Usuario } = require('./model');
const { Resposta } = require('../ingredientes/model');
//const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

class UsuariosController {

    constructor() {
        
    }

    async create(req, res) {
        const { nome, email, senha } = req.body;
    
        if (!nome || !email || !senha || nome.trim() === '' || email.trim() === '' || senha.trim() === '') {
            return res.status(400).json({ msg: "Todos os campos são obrigatórios." });
        }
    
        try {
            const checaUsuario = await Usuario.findOne({
                where: {
                    email
                }
            });
    
            if (checaUsuario) {
                return res.status(400).json({ msg: "Esse e-mail já está cadastrado no sistema" });
            }
    
            const senhaCripto = await bcrypt.hash(senha, 10);
            const userToDB = await Usuario.create({
                nome: nome.trim(),
                email: email.trim(),
                senha: senhaCripto
            });
    
            return res.status(201).json(userToDB);
    
        } catch (error) {
            console.error("Erro ao criar usuário:", error);
            return res.status(500).json({ msg: "Erro interno do servidor" });
        }
    }    

    async auth(req, res) {
        const { email, senha } = req.body;

        const user = await Usuario.findOne({
            where: {
                email
            }
        });

        if (!user) {
            return res.status(400).json({ msg: "E-mail ou senha inválidos"});
        }

        const checa = await bcrypt.compare(senha, user.senha);

        if (checa) {
        const meuJwt = jwt.sign(user.dataValues, 'Secret não poderia estar hardcoded');

        return res.json(meuJwt);
        } else {
            return res.status(400).json({ msg: "E-mail ou senha inválidos"});
        }
    }

    async list(req, res) {
        const users = await Usuario.findAndCountAll();
        return res.status(200).json(users);
    }

    async update(req, res) {
        const { nome, antigaSenha, novaSenha } = req.body;
        const email = req.user.email;

        if (nome !== '' && antigaSenha !== '' && novaSenha !== '') {

            const usuario = await Usuario.findOne({
                where: {
                    email
                }
            });
    
            if (!usuario) {
                return res.status(400).json({ msg: "E-mail inválido"});
            }

            const checa = await bcrypt.compare(antigaSenha, usuario.senha);

            if (checa) {
                const senhaFinal = await bcrypt.hash(novaSenha, 10);
                usuario.set({
                    nome: nome,
                    senha: senhaFinal
                });
                await usuario.save();
                return res.status(200).json({ msg: "Dados atualizados com sucesso"});
            } else {
                return res.status(400).json({ msg: "Senha atual inválida"});
            }

        } else {
            return res.status(400).json({ msg: "Algum campo está em branco."});
        }
    }

    async delete(req, res) {
        const email = req.user.email;
        const user = await Usuario.findByPk(email);

        if (user != null) {
            await user.destroy();
            return res.status(200).json({ msg: "Conta deletada com sucesso" });
        } else {
            return res.status(404).json({ msg: "Esse e-mail não está cadastrado." });
        }
    }
}


module.exports = UsuariosController;