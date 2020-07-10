const express = require('express');
const router = express.Router();
const roleController = require('../controllers/roleController')

router.get('/list', roleController.list);
router.get('/get/:id', roleController.get);
router.post('/create', roleController.create);
router.post('/update/:id', roleController.update);
router.post('/delete', roleController.delete);

module.exports = router;