const { Router } = require('express');
const { isAuth } = require('../middlewares/isAuth');
const router = Router();

const IngredientesController = require('./controller');
const controller = new IngredientesController();

router.put('/:id', isAuth, (req, res) => controller.update(req, res));
router.delete('/:id', isAuth, (req, res) => controller.delete(req, res));

module.exports = router;