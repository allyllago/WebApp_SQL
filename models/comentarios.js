var mod = require("../utils/connection").modulo
var conex = require("../utils/connection").conexion
var Poke = require("./pokemon");
var Ataques = require("./ataques");

var Comentarios = conex.define("comentarios", {
	body: mod.STRING,
	myDate: { 
		type: mod.DATE, 
		defaultValue: mod.NOW 
	}
});

module.exports = Comentarios;