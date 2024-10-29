const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

// Configuración de la conexión a MySQL
const db = mysql.createConnection({
    host: 'localhost',       // Cambia esto si tu MySQL no está en localhost
    user: 'root',      // Reemplaza con tu usuario de MySQL
    password: '123456789', // Reemplaza con tu contraseña de MySQL
    database: 'supermercadocampiña' // El nombre de tu base de datos
});

// Conectar a la base de datos
db.connect(err => {
    if (err) {
        console.error('Error al conectar a la base de datos:', err);
        return;
    }
    console.log('Conectado a la base de datos MySQL');
});

// Definir endpoints aquí...

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
