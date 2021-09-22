const express = require('express');
const app = express();
const path = require('path');
const { sequelize } = require('./database/models/index')

// Settings
const PORT = process.env.PORT || 3000

//Middlewares 

app.use(express.static(path.resolve(__dirname, '../public')));
app.use(express.json());
//URL encode  - Para que nos pueda llegar la información desde el formulario al req.body
app.use(express.urlencoded({ extended: false }));

//Routes 
app.use(require('./routes/routes'));

app.listen(PORT, () => {
    console.log('Servidor corriendo en el puerto' + PORT)

    sequelize.authenticate().then(()=>{
        console.log('Conexion a la base de datos: OK')
    })
}

);
