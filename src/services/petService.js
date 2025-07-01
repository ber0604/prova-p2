const PetModel = require('../models/petModel');

class PetService {
  static async listPets() {
    return await PetModel.getAllPets();
  }

  static async listPet(id) {
    return await PetModel.getPetById(id);
  }

  static async listPetsAvailable() {
    return await PetModel.getAllPetsAvailable();
  }

  static async addPet(pet) {
    return await PetModel.createPet(pet);
  }

  static async editPet(id, pet) {
    await PetModel.updatePet(id, pet);
  }

  static async removePet(id) {
    const pet = await PetModel.getPetById(id);
    if (!pet) {
      throw new Error('Pet not found');
    }
    if (pet.status === 'adopted') {
      throw new Error('Pet cannot be deleted because it has been adopted');
    }
    await PetModel.deletePet(id);
  }
}

module.exports = PetService;
