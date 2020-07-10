const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/EmployeeController')

router.get('/waka', (req, res) => {
    res.json({status: 'Employeed Saved'});
});

router.get('/test', employeeController.test);
router.get('/testdata', employeeController.testdata);
router.get('/list', employeeController.list);
router.get('/get/:id', employeeController.get);
router.post('/create', employeeController.create);
router.post('/update/:id', employeeController.update);
router.post('/delete', employeeController.delete);

module.exports = router;