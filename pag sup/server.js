const express = require('express');
const cors = require('cors');
const connection = require('./database');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

//end point productos
app.get('/productos', (req, res) => {
    const query = 'SELECT p.id, p.nombre, p.precio, c.nombre AS categoria FROM productos p JOIN categorias c ON p.categoria_id = c.id';
    connection.query(query, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

app.get('/usuarios', (req, res) => {
    connection.query('SELECT * FROM usuarios', (err, results) => {
        if (err) {
            res.status(500).send('error database');
            return;
        }
        res.json(results);
    });
});

app.listen(PORT, () =>  {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});