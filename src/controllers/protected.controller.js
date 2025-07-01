const PetService = require('../services/petService');
const UserService = require('../services/userService');
const AdoptionService = require('../services/adoptionService');

class ProtectedController {
  static async getUsers(req, res) {
    try {
      const result = await UserService.getUsers();

      return res.status(200).json({
        users: result,
      });
    } catch (error) {
      return res.status(500).json({
        message: 'Erro ao buscar usuarios',
        error: error.message,
      });
    }
  }

  static async getUserById(req, res) {
    try {
      const result = await UserService.getUserById(req.params.id);

      return res.status(200).json({
        result,
      });
    } catch (error) {
      return res.status(500).json({
        message: 'Erro ao buscar usuario',
        error: error.message,
      });
    }
  }

  static async updateUserById(req, res) {
    try {
      const id = req.params.id;
      await UserService.updateUserById(id, req.body);
      res.json({ message: 'Usuário atualizado com sucesso.' });
    } catch (error) {
      res.status(400).json({ error: error.message }); // Retorna erro se não
    }
  }

  static async deleteUserById(req, res) {
    try {
      const id = req.params.id;
      await UserService.deleteUserById(id);
      res.json({ message: 'Usuário deletado com sucesso.' });
    } catch (error) {
      res.status(400).json({ error: error.message }); // Retorna erro se não
    }
  }

  static async createPet(req, res) {
    try {
      const result = await PetService.addPet(req.body);
      return res.status(201).json(result);
    } catch (error) {
      return res.status(409).json({ message: error.message });
    }
  }

  static async getPets(req, res) {
    try {
      const result = await PetService.listPets();
      return res.status(200).json({
        result,
      });
    } catch (error) {
      return res.status(500).json({
        message: 'Erro ao buscar pets',
        error: error.message,
      });
    }
  }

  static async getPetById(req, res) {
    try {
      const result = await PetService.listPet(req.params.id);

      return res.status(200).json({
        result,
      });
    } catch (error) {
      return res.status(500).json({
        message: 'Erro ao buscar pet',
        error: error.message,
      });
    }
  }

  static async updatePetById(req, res) {
    try {
      const id = req.params.id;
      await PetService.editPet(id, req.body);
      res.json({ message: 'Pet atualizado com sucesso.' });
    } catch (error) {
      res.status(400).json({ error: error.message }); // Retorna erro se não
    }
  }

  static async deletePetById(req, res) {
    try {
      const id = req.params.id;
      await PetService.removePet(id);
      res.json({ message: 'Pet deletado com sucesso.' });
    } catch (error) {
      res.status(400).json({ error: error.message }); // Retorna erro se não
    }
  }

  static async getAdoptions(req, res) {
    try {
      const result = await AdoptionService.listAdoptions();

      return res.status(200).json({
        adoptions: result,
      });
    } catch (error) {
      return res.status(500).json({
        message: 'Erro ao buscar adoptions',
        error: error.message,
      });
    }
  }

  static createAdoption(req, res) {
    try {
      const result = AdoptionService.createAdoption(req.body);
      return res.status(201).json(result);
    } catch (error) {
      return res.status(500).json({
        message: 'Erro ao buscar criar adoption',
        error: error.message,
      });
    }
  }
}

module.exports = ProtectedController;
