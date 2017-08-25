var mod = require("../utils/connection").modulo
var conex = require("../utils/connection").conexion
var Poke = require("./pokemon");

var Ataques = conex.define("ataques",{
	name: mod.STRING,
	tipo: mod.STRING,
	minLevel: {
		type: mod.INTEGER,
		validate:{
			min: 0,
			max: 99
		},
		defaultValue: 0
	},
	description: mod.STRING,
	baseDamage: {
		type: mod.INTEGER,
		validate:{
			min: 0,
			max: 99
		},
		defaultValue: 0
	},
	accuracy: {
		type: mod.INTEGER,
		validate:{
			min: 0,
			max: 99
		},
		defaultValue: 0
	},
	powerPoints: {
		type: mod.INTEGER,
		validate:{
			min: 0,
			max: 99
		},
		defaultValue: 0
	}
});


module.exports = Ataques;