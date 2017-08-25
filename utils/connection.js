var modulo = require("sequelize"); //requerimos el modulo
var conexion = new modulo('postgres://postgres:coco@localhost:5432/pokebase');

module.exports = {conexion: conexion, modulo: modulo};
