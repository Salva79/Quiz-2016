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

//Ir al formulario de nuevo usuario
exports.new = function(req,res){
	var user = models.users.build({});
	res.render('user/new', {user:user});
}

//Recogemos el formulario para guardar
exports.create = function(req,res){
	var user = models.users.build(req.body.user);
	user.validate().then(function(err){
		if(err){
			res.render('user/new',{user: user, errors: err.errors});
		}else{
			if(user.password !== req.body.user['password2']){
				res.render('user/new',{user: user, errors: [{message: 'No coinciden los password'}]});
			}else{
				user.save({fields: ["username","password"]}).then(function(){
				res.redirect('/user')});		
			}
		}	
	});	
};

exports.index =function(req,res){
	models.users.findAll().then(function(users){
		res.render('user/index',{users: users});			
	})	
};

exports.load = function(req,res,next,userId){
	models.users.findOne({
		where: { id: Number(userId)}
	}).then(function(user){
		if(user){
			req.user = user;
			next();
		}else{
			next(new Error('No existe user Id= ' + userId));
		}
	}).catch(function(error){
		next(error);
	});
};

exports.edit = function(req,res) {
	var user = req.user;
	res.render('user/edit', {user: user});
}