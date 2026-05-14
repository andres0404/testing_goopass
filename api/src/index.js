const express = require('express');
const app = express();
const port = 3000;
const losRecursos = require('./resources');
const proyectosResoure = require('./proyectos');
const tareasResources = require('./tareas');
const usuarioResources = require('./usuarios');

app.use(express.json());
// app.use('/api/proyectos', losRecursos);
app.use('/api/proyectos',proyectosResoure);
app.use('/api/tareas', tareasResources);
app.use('/api/usuarios', usuarioResources);


app.listen(port, () => {
    console.log(`Ejemplo de una app escuchando por el puerto ${port}`);
});