var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({extended:true}));
router.use(bodyParser.json());

var User = require('./User');

// CREA UN NUEVO USUARIO
router.post('/', function (req, res) {
    User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        },
        function (err, user) {
            if (err) return res.status(500).send("Hubo un problema al agregar la información a la base de datos.");
            res.status(200).send(user);
        });
});
// DEVUELVE TODOS LOS USUARIOS EN LA BASE DE DATOS
router.get('/', function (req, res) {
    User.find({}, function (err, users) {
        if (err) return res.status(500).send("Hubo un problema para encontrar a los usuarios.");
        res.status(200).send(users);
    });
});

// OBTIENE UN ÚNICO USUARIO DE LA BASE DE DATOS
router.get('/:id', (req, res) => {
    User.findById(req.params.id, (err, user) => {
        if (err) return res.status(500).send("Hubo un problema para encontrar el usuario.");
        if (!user) return res.status(404).send("Ningún usuario encontrado.");
        res.status(200).send(user);
    });
});


// ELIMINA A UN USUARIO DE LA BASE DE DATOS
router.delete('/:id', (req, res) => {
    User.findByIdAndRemove(req.params.id, (err, user) => {
        if (err) return res.status(500).send("Hubo un problema para eliminar el usuario");
        res.status(200).send("Usuario " + user.name + " fue eliminado.");
    });
});


//  ACTUALIZA UN ÚNICO USUARIO EN LA BASE DE DATOS
router.put('/:id', (req, res) => {
   User.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, user) => {
      if (err) return res.status(500).send("Hubo un problema para actualizar el usuario");
      res.status(200).send(`Usuario ${user.name} fue actualizado`);
   });
});

module.exports = router;

