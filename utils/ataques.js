var mod = require("./connection").modulo
var conex = require("./connection").conexion
var Poke = require("../models/pokemon");
var Ataques =require("../models/ataques")

Ataques.create({
		name: "Maza Estrellada",
		tipo: "Ataque cercano",
		minLevel: 7,
		description: "Arma ancestral de los Andes",
		baseDamage: 8,
		accuracy: 7,
		powerPoints: 8})
	.then(function(ataques){})

Ataques.create({
	name: "Martillo de Guerra",
	tipo: "Ataque cercano",
	minLevel: 7,
	description: "Arma de guerra Nordica",
	baseDamage: 9,
	accuracy: 5,
	powerPoints: 8
}).then(function(ataques){})

Ataques.create({	
	name: "Boleadoras",
	tipo: "Ataque distacia media",
	minLevel: 8,
	description: "Arma de los guerreros Patagonicos",
	baseDamage: 7,
	accuracy: 5,
	powerPoints: 9
}).then(function(ataques){})

Ataques.create({	
	name: "Ancazo",
	tipo: "Ataque corta distancia",
	minLevel: 3,
	description: "Cabezazo mortal Tucumano",
	baseDamage: 5,
	accuracy: 8,
	powerPoints: 5
}).then(function(ataques){})