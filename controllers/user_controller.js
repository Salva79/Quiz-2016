var models=require('../models/models.js');


//Comprueba si el usuario esta registrado en users
//Si autenticación falla o hay errores se ejecuta callback(error)

exports.autenticar = function(login,password,callback){
	models.users.findOne({
		where: {username: login , password: password},
	}).then(function(user){
		if(user){
			callback(null, user);
		}
	}).catch(function(error){
		callback(new Error('No existe el usuario.'));
	});
};
