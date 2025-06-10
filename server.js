require('dotenv').config(); // Carrega variáveis de ambiente
const app = require('./src/app'); // Importa o app já configurado (rotas,

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});