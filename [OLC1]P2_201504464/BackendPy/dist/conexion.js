"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//import * as controller from './controller';
const peticionesAPI = require("./peticionesAPI");
// Cargar modulo express
const express = require('express');
// Cargar modulo cors
const cors = require('cors');
//Creamos una nueva instancia para nuestra aplicacion
const app = express();
// cargar body parser para leer el body de los request
const bodyParser = require('body-parser');
//configuraciones
app.set('port', 4000);
//middlewares
app.use(cors());
app.use(express.urlencoded({ extended: false }));
//app.use(express.json());
// recibir datos en formato json
app.use(bodyParser.json());
//rutas
app.get('/', (req, res) => {
    res.send(`Compiladores 1 - Sección B, http://localhost:${app.get('port')}`);
});
app.get('/abi', (request, response) => {
    let j = [
        {
            'id': 1,
            'nombre': "Abi"
        }
    ];
    response.send(j);
});
app.post('/analizar', peticionesAPI.analyzer);
//app.get('/analisis', controller.analizar);
//app.post('/miAuxiliar', controller.miAuxiliar);
//export default app;
app.listen(app.get('port'), () => {
    console.log("BackendPy inicializado en", app.get('port'));
});
