const PetService = require('../services/petService');
const UserService = require('../services/userService');

class PublicController {
  static async registerUser(req, res) {
    try {
      const result = await UserService.registerUser(req.body);
      return res.status(201).json(result);
    } catch (error) {
      return res.status(409).json({ message: error.message });
    }
  }

  static async login(req, res) {
    try {
      const result = await UserService.loginUser(req.body);
      return res.status(200).json(result);
    } catch (error) {
      const status =
        error.message === 'Usuário não encontrado' ||
        error.message === 'Senha inválida'
          ? 401 // Não autorizado
          : 500; // Erro interno do servidor
      return res.status(status).json({ message: error.message });
    }
  }

  static async petsAvailable(req, res) {
    try {
      const pets = await PetService.listPetsAvailable();
      return res.status(200).json({
        petsDisponiveis: pets,
      });
    } catch (error) {
      return res.status(500).json({
        message: 'Erro ao acessar a rota pública',
        error: error.message,
      });
    }
  }
}
module.exports = PublicController;
