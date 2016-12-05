// Definicion del modelo de Ussers

module.exports = function(sequelize, DataTypes){
	return sequelize.define('users', {
		username: {
			type: DataTypes.STRING,
			validate: {notEmpty:{msg: "-> Falta Nombre usuario"}}
		}, 
		password: {
			type: DataTypes.STRING,
			validate: {notEmpty:{msg: "-> Falta Contraseña"}}
		}, 
		aciertos: {
			type: DataTypes.INTEGER,
			defaultValue: 0
		}
	});
}