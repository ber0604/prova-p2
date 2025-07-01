const express = require('express');

const { authenticateToken, authorizeRole, authorizeUserEdition } = require('../middlewares/auth.middleware');

const ProtectedController = require('../controllers/protected.controller');

const router = express.Router();

router.get('/users', authenticateToken, authorizeRole('admin'), ProtectedController.getUsers);
router.get('/users/:id', authenticateToken, authorizeUserEdition(), ProtectedController.getUserById);
router.put('/users/:id', authenticateToken, authorizeUserEdition(), ProtectedController.updateUserById);
router.delete('/users/:id', authenticateToken, authorizeRole('admin'), ProtectedController.deleteUserById);

router.get('/pets', authenticateToken, authorizeRole('admin'), ProtectedController.getPets);
router.get('/pets/:id', authenticateToken, authorizeRole('admin'), ProtectedController.getPetById);
router.post('/pets', authenticateToken, authorizeRole('admin'), ProtectedController.createPet);
router.put('/pets/:id', authenticateToken, authorizeRole('admin'), ProtectedController.updatePetById);
router.delete('/pets/:id', authenticateToken, authorizeRole('admin'), ProtectedController.deletePetById);

router.get('/adoptions', authenticateToken, authorizeRole('admin'), ProtectedController.getAdoptions);
router.post('/adoptions', authenticateToken, authorizeRole('adopter'), ProtectedController.createAdoption);

module.exports = router;