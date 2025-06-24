const PetModel = require('../models/petModel');
const AdoptionModel = require('../models/adoptionModel');

function validateAdoption({ pet_id, user_id }) {
    const pet = PetModel.getPetById(pet_id);
    if (pet.status == 'adopted') {
        throw new Error('O pet nao está disponível para adoção.');
    }
    
    const adoptions = AdoptionModel.getAdoptionsByIdUserIdPet(user_id, pet_id);
    if (adoptions.length > 0 ) {
        throw new Error('Não é possível adotar o mesmo pet mais de uma vez.');
    }
}

module.exports = validateAdoption;