const bcrypt = require('bcryptjs'); // Biblioteca para criptografia de senhas
const jwt = require('jsonwebtoken'); // Biblioteca para geração de tokens JWT
const UserModel = require('../models/userModel');

class UserService {
  static async registerUser(user) {
    const { email, password, role } = user;
    const existing = await UserModel.findByEmail(email);
    if (existing) {
      throw new Error('Usuário já existe');
    }
    const hashed = await bcrypt.hash(password, 10);
    user.password = hashed;
    if (role == null) {
      user.role = 'adopter';
    }
    const id = await UserModel.create(user);
    return { message: 'Usuário registrado com sucesso', id };
  }

  static async loginUser({ email, password }) {
    const user = await UserModel.findByEmail(email);
    if (!user) {
      throw new Error('Usuário não encontrado');
    }
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      throw new Error('Senha inválida');
    }
    const token = jwt.sign(
      { email: user.email, role: user.role, id: user.id },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
    return { token };
  }

  static async getUsers() {
    const users = await UserModel.getUsers();
    return { users };
  }

  static async getUserById(id) {
    const user = await UserModel.getUsuarioById(id);
    return { user };
  }

  static async updateUserById(id, user) {
    await UserModel.updateUser(id, user);
  }

  static async deleteUserById(id) {
    await UserModel.deleteUser(id);
  }
}

module.exports = UserService;
