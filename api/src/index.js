const express = require('express');
const app = express();
const port = 3000;
const losRecursos = require('./resources');
const proyectosResoure = require('./proyectos');
const tareasResources = require('./tareas');
const usuarioResources = require('./usuarios');
const cors = require('cors');

app.use(express.json());
// app.use('/api/proyectos', losRecursos);
app.use(cors({
    origin:'http://localhost:5173',
    methods: ['GET', 'POST','PUT','DELETE'],
    credentials: false
}));
app.use('/api/proyectos',proyectosResoure);
app.use('/api/tareas', tareasResources);
app.use('/api/usuarios', usuarioResources);


app.listen(port, () => {
    console.log(`Ejemplo de una app escuchando por el puerto ${port}`);
});