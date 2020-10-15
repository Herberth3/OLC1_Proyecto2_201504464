//import * as controller from './controller';

// Cargar modulo express
const express = require('express');
// Cargar modulo cors
const cors = require('cors');
//Creamos una nueva instancia para nuestra aplicacion
const app =  express();

//configuraciones
//app.set('port',3000);

//middlewares
app.use(cors());
app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.listen(5000, () => {
    console.log("BackendPy inicializado");
});

//rutas
//app.get('/', (req, res) => {
    //res.send(`Compiladores 1 - Sección B, http://localhost:${app.get('port')}`);
//});

//app.get('/analisis', controller.analizar);
//app.post('/miAuxiliar', controller.miAuxiliar);

//export default app;