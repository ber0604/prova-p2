const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.sendStatus(401);
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
}

function authorizeRole(role) {
    return (req, res, next) => {
        if (req.user.role !== role) {
            return res.status(403).json({ message: 'Acesso negado' });
        }
        next();
    };
}

function authorizeUserRegister() {
    return (req, res, next) => {
        
        const loggedUserRole = req.user.role;
        const newUserRole = req.body.role;
        
        if (newUserRole === 'admin' && loggedUserRole !== 'admin') {
            return res.status(403).json({ message: 'Apenas administradores podem criar usuários com role admin' });
        }

        next();
    };
}

function authorizeUserEdition() {
    return (req, res, next) => {
        
        const userIdAtualizar = req.params.id;
        const userIdLogado = req.user.id;
        
        if (userIdAtualizar != userIdLogado && req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Apenas administradores podem editar outros usuarios' });
        }

        next();
    };
}

module.exports = { authenticateToken, authorizeRole, authorizeUserRegister, authorizeUserEdition };