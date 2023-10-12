const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

//Post Method
router.post('/post', userController.post);

//Get all Method
router.get('/getAll', userController.getAll);

//Get by ID Method
router.get('/getOne/:id', userController.getOne);

//Update by ID Method
router.patch('/update/:id', userController.update);

//Delete by ID Method
router.delete('/delete/:id', userController.delete);

module.exports = router;
