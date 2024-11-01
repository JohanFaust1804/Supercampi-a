const mysql = require('mysql2');


// Configuración de la conexión a MySQL
const connection = mysql.createConnection({
    host: 'localhost',       // Cambia esto si tu MySQL no está en localhost
    user: 'root',      // Reemplaza con tu usuario de MySQL
    password: '123456789', // Reemplaza con tu contraseña de MySQL
    database: 'supermercadocampiña' // El nombre de tu base de datos
});

// Conectar a la base de datos
connection.connect(err => {
    if (err) {
        console.error('Error al conectar a la base de datos:', err);
        return;
    }
    console.log('Conectado a la base de datos MySQL');
});

// Definir endpoints aquí...

module.exports = connection;