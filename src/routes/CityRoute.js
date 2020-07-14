const express = require('express');
const router = express.Router();
const cityController = require('../controllers/CityController')

router.get('/list', cityController.list);
router.get('/get/:id', cityController.get);
router.post('/create', cityController.create);
router.post('/update/:id', cityController.update);
router.post('/delete', cityController.delete);

module.exports = router;