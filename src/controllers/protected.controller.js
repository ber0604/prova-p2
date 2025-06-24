const PetService = require('../services/petService');
const UserService = require('../services/userService');
const AdoptionService = require('../services/adoptionService');

class ProtectedController {

    static getUsers(req, res) {
        try {
            const result = UserService.getUsers();

            return res.status(200).json({
                users: result
            });
        } catch (error) {
            return res.status(500).json({
                message: 'Erro ao buscar usuarios', error:
                    error.message
            });
        }
    }

    static getUserById(req, res) {
        try {
            const result = UserService.getUserById(req.body.id);

            return res.status(200).json({
                users: result
            });
        } catch (error) {
            return res.status(500).json({
                message: 'Erro ao buscar usuario', error:
                    error.message
            });
        }
    }

    static async updateUserById(req, res) {
        try {
            const { id } = req.params;
            await UserService.updateUserById(id, req.body);
            res.json({ message: 'Usuário atualizado com sucesso.' });
        } catch (error) {
            res.status(400).json({ error: error.message }); // Retorna erro se não
        }
    }   

    static async deleteUserById(req, res) {
        try {
            const { id } = req.params;
            await UserService.deleteUserById(id);
            res.json({ message: 'Usuário deletador com sucesso.' });
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

    static getPets(req, res) {
        try {
            const result = PetService.listPets();
            return res.status(200).json({
                pets: result
            });
        } catch (error) {
            return res.status(500).json({
                message: 'Erro ao buscar pets', error:
                    error.message
            });
        }
    }

    static getPetById(req, res) {
        try {
            const result = PetService.listPet(req.body.id);

            return res.status(200).json({
                pets: result
            });
        } catch (error) {
            return res.status(500).json({
                message: 'Erro ao buscar pet', error:
                    error.message
            });
        }
    }

    static async updatePetById(req, res) {
        try {
            const { id } = req.params;
            await PetService.editPet(id, req.body);
            res.json({ message: 'Pet atualizado com sucesso.' });
        } catch (error) {
            res.status(400).json({ error: error.message }); // Retorna erro se não
        }
    }   

    static async deletePetById(req, res) {
        try {
            const { id } = req.params;
            await PetService.removePet(id);
            res.json({ message: 'Pet deletado com sucesso.' });
        } catch (error) {
            res.status(400).json({ error: error.message }); // Retorna erro se não
        }
    }      

    
    static getAdoptions(req, res) {
        try {
            const result = AdoptionService.listAdoptions();

            return res.status(200).json({
                adoptions: result
            });
        } catch (error) {
            return res.status(500).json({
                message: 'Erro ao buscar adoptions', error:
                    error.message
            });
        }
    }

    static createAdoption(req, res) {
        try {
            const result = AdoptionService.createAdoption(req.body);
            return res.status(201).json(result);
        } catch (error) {
            return res.status(500).json({
                message: 'Erro ao buscar criar adoption', error:
                    error.message
            });
        }
    }
    
}

module.exports = ProtectedController;