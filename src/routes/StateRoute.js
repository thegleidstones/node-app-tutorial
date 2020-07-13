const express = require('express');
const router = express.Router();
const stateController = require('../controllers/StateController')

router.get('/list', stateController.list);
router.get('/get/:id', stateController.get);
router.post('/create', stateController.create);
router.post('/update/:id', stateController.update);
router.post('/delete', stateController.delete);

module.exports = router;