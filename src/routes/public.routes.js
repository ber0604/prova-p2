const express = require('express');

const PublicController = require('../controllers/public.controller');

const router = express.Router();

router.get('/pets/available', PublicController.petsAvailable);

router.get('/users', PublicController.users);

module.exports = router;