const express = require('express');
const router = express.Router();

// Controller
const AuthController = require('../controllers/AuthController');
const PostController = require('../controllers/PostController');

// Middlewares
const auth= require('../middlewares/auth');
const PostPolicy = require('../policies/PostPolicy');


// Home
router.get('/', (req, res) => res.json({ clave: "con el server" }));

//Login
router.post('/api/signin', AuthController.signIn);
//Registro
router.post('/api/signup', AuthController.signUp);

//Rutas Posteos
//Index de Posteos getAll
router.get('/api/posts', auth, PostController.index);
router.get('/api/posts/:id', auth, PostController.find, PostPolicy.show, PostController.show);
router.patch('/api/posts/:id', auth, PostController.find,PostPolicy.update, PostController.update);
router.delete('/api/posts/:id', auth,PostController.find,PostPolicy.delete, PostController.delete);  


module.exports = router;