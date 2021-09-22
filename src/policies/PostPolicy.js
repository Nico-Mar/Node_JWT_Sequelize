const { User} = require('../database/models/index');

module.exports = {



    show(req,res,next){
        if (req.user.id===req.post.user.id || User.isAdmin(req.user.roles)) {
            next();
        } else {
            req.status(401).json({msg:'Usuario no autorizado para ver este post'});
        }
    },

    update(req,res,next){
        if (req.user.id===req.post.user.id || User.isAdmin(req.user.roles)) {
            next();
        } else {
            req.status(401).json({msg:'Usuario no autorizado para ver este post'});
        }
    },

    delete(req,res,next){
        if (req.user.id===req.post.user.id || User.isAdmin(req.user.roles)) {
            next();
        } else {
            req.status(401).json({msg:'Usuario no autorizado para ver este post'});
        }
    },




};