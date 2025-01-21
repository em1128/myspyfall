
const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');

router.post('/users', 
  userController.addUser);
router.get('/users', 
  userController.getUsers);
router.put('/users',
  userController.updateUser);
router.delete('/users/:userId',
  userController.removeUser);


module.exports = router;