// src/config/createUserAdmin.js
const bcrypt = require('bcryptjs'); // Biblioteca para criptografia de senhas
const db = require('./database'); // ajuste se o caminho estiver diferente

async function createAdminUser() {
  try {
    const hashedPassword = await bcrypt.hash('admin123', 10); // senha padrão

    const [result] = await db.query(
      'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
      ['Administrador', 'admin@sistema.com', hashedPassword, 'admin']
    );

    console.log('✅ Usuário admin criado com ID:', result.insertId);
    process.exit(0);
  } catch (err) {
    console.error('❌ Erro ao criar admin:', err.message);
    process.exit(1);
  }
}

createAdminUser();