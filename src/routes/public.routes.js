const express = require('express');

const PublicController = require('../controllers/public.controller');

const router = express.Router();

router.get('/pets/available', PublicController.petsAvailable);

router.post('/users', authorizeUserRegister, PublicController.registerUser);

router.post('/login', PublicController.login);

module.exports = router;