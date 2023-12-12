const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mysqlPool = require('./config/connect');

const port = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const userRoutes = require('./routes/userRoute');
app.use('/users', userRoutes);




const produitRoutes = require('./routes/produitRoute');
app.use('/produits', produitRoutes);


console.log('Connecté à la base de données MySQL');
app.listen(port, () => console.log('Le serveur tourne sur le port ' + port));
