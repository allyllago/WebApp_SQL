var mod = require("../utils/connection").modulo
var conex = require("../utils/connection").conexion
var Ataques = require('./ataques');
var Comentarios = require("./comentarios")

var Poke = conex.define("poke", {
		name: mod.STRING,
		tipo: mod.STRING,
		level: {
			type: mod.INTEGER,
			validate:{
				min: 0
			}
		},	
		imgURL: mod.STRING, 
});

Poke.hasMany(Comentarios, {foreignKey: "pokeid", onDelete: "cascade"});


Poke.belongsToMany(Ataques, {through: "ataques_poke"});
Ataques.belongsToMany(Poke, {through: "ataques_poke"});

conex.sync({force: false});


module.exports= Poke;
