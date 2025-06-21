const PetService = require('../services/petService');
const AdoptionModel = require('../models/adoptionModel');

class PublicController {

    // Método que responde à rota pública inicial
    static users(req, res) {
        try {
            // Envia uma mensagem de boas-vindas sem exigir autenticação
            return res.status(200).send('Bem-vindo à API pública!');
        } catch (error) {
            // Em caso de erro inesperado, retorna status 500 com a mensagem do erro
            return res.status(500).json({
                message: 'Erro ao acessar a rota pública',
                error: error.message
            });
        }
    }

    // Método que responde à rota pública inicial
    static petsAvailable(req, res) {
        try {
            // Envia uma mensagem de boas-vindas sem exigir autenticação
            let pets = PetService.listPetsAvailable();
            return res.status(200).json({
                petsDisponiveis: pets
            });
        } catch (error) {
            // Em caso de erro inesperado, retorna status 500 com a mensagem do erro
            return res.status(500).json({
                message: 'Erro ao acessar a rota pública',
                error: error.message
            });
        }
    }
}
module.exports = PublicController;
