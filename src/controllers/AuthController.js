const {
    User
} = require('../database/models/index');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authConfig = require('./config/auth');

module.exports = {

    // Login
    signIn(req, res) {

        let {
            email,
            password
        } = req.body;

        //Buscar usuario
        User.findOne({
            where: {
                email: email
            }
        }).then(user => {

            if (!user) {
                res.status(404).json({
                    msg: "Nombre de usuario no encontrado"
                });
            } else {
                if (bcrypt.compareSync(password, user.password)) {
                    //Devolvemos token
                    let token = jwt.sign({
                        user: user
                    }, authConfig.secret, {
                        expiresIn: authConfig.expires
                    });
                    res.json({
                        user: user,
                        token: token
                    });
                } else {
                    //Unauthorized access
                    res.status(401).json({
                        msg: "Contraseña incorrecta"
                    });
                }
            }

        }).catch(err => {
            res.status(500).json(err);
        });

    },
    // Resgitro
    signUp(req, res) {

        //Encriptamos el password
        //Acá hay que validar el pasword antes de pasarlo a encriptado,
        // ya que luego del encriptado la validdación de la base de datos no sabrá cual es el string original.
        let password = bcrypt.hashSync(req.body.password, Number.parseInt(authConfig.rounds));

        User.create({
            name: req.body.name,
            email: req.body.email,
            password: password
        }).then(user => {

            //Creamos el token
            let token = jwt.sign({
                user: user
            }, authConfig.secret, {
                expiresIn: authConfig.expires
            });

            res.json({
                user: user,
                token: token
            });
        }).catch(err => {
            res.status(500).json(err);
        });
    }
};