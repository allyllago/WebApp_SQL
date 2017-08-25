var express = require('express');
var router = express.Router();
var Poke = require("../models/pokemon");
var Comentarios = require("../models/comentarios");
var Ataques = require("../models/ataques");
var conex = require("../utils/connection").conexion;

router.get("/", function(req, res, next){
	res.render("primera")
});
router.post("/", function(req, res, next){
	res.redirect("/"+req.body.usuario)
});

router.get('/:nombre', function(req, res, next) {
	res.render('segunda', { nombre: req.params.nombre });
});

router.get('/:nombre/pokemon', function(req, res, next) {
	Poke.findAll().then(function(pokemon){
		console.log(pokemon);
		res.render("tercera", { nombre: req.params.nombre, pokemon: pokemon });
	})
});

router.get("/:nombre/pokemon/new", function(req, res, next){
	res.render("nuevopokemon", { nombre: req.params.nombre })
})

router.post("/:nombre/pokemon/new", function(req, res, next){
	var contenido = req.body
	Poke.create(contenido).then(function(pokemon){
		res.redirect("/"+req.params.nombre+"/pokemon")
	})
})

//PAGINA GENERICA INDIVIDUAL
router.get('/:nombre/pokemon/:id', function(req, res, next) {
	Poke.findOne(
		{
			where: { id: req.params.id }, 
			include:[{model: Comentarios}, {model: Ataques}]
		}
	).then(function(pokemon){
		Ataques.findAll().then(function(ataquestotales){
			res.render("generico", {
				nombre: req.params.nombre,
				id: req.params.id,
				pokemon: pokemon,
				ataquestotales: ataquestotales
			});
		})
	})
});

// //AGREAGAR COMENTARIO
router.post('/:nombre/pokemon/:id/comentario', function(req, res, next){
	var contenido = req.body
	Poke.findById(req.params.id).then(function(pokemon){Comentarios.create({body: contenido.body, pokeid: req.params.id})
		.then(function(comentarios){ res.redirect("/"+req.params.nombre+"/pokemon/"+req.params.id)})
	});
})
	
//AGREGAR ATAQUE
router.post('/:nombre/pokemon/:id/ataque', function(req, res, next){
	Poke.findById(req.params.id).then(function(pokemon){
		Ataques.findById(req.body.nombre).then(function(ataques) {
			pokemon.addAtaques(ataques).then(function() {
				res.status(307);
				res.redirect("/"+req.params.nombre+"/pokemon/"+req.params.id)	
			});
		})
	});
})

//ELIMINAR ATAQUE

router.post('/:nombre/pokemon/:id/eliminarataque', function(req, res, next){
	Poke.findById(req.params.id).then(function(pokemon){
		conex.query('DELETE FROM ataques_poke WHERE "pokeId"='+ req.params.id+'AND "ataqueId"='+ req.body.nombre)
		.then(function(result){
			res.redirect("/"+req.params.nombre+"/pokemon/"+req.params.id)
		});
	})
})
//ELIMINAR POKEMON

router.get('/:nombre/pokemon/:id/eliminar', function(req, res, next) {
	Poke.destroy(
		{ 
			where: { id: req.params.id }
		}).then(function(poke){
			console.log(poke)
			res.redirect("/"+req.params.nombre+"/pokemon")
		})
	})
	

//EDITAR LOS POKEMONES
router.get('/:nombre/pokemon/:id/editar', function (req, res, next){
	res.render("editar", {nombre: req.params.nombre, id: req.params.id})
})

router.post('/:nombre/pokemon/:id/editar', function (req, res, next){
	Poke.update(req.body, {
  				where: {
    				id: req.params.id
  				}
				}).then(function(pokemon){res.redirect("/"+req.params.nombre+"/pokemon"+"/"+req.params.id)})
})

module.exports = router;