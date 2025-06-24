const express = require('express');

const publicRoutes = require('./routes/public.routes');
const protectedRoutes = require('./routes/protected.routes');

const app = express();
app.use(express.json());
app.use(publicRoutes);
app.use(protectedRoutes);

module.exports = app;
