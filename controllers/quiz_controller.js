var models=require('../models/models.js');

// AUTOLOAD - FACTORIZA el código si ruta incluye :quizId
exports.load = function(req,res,next,quizId){
	models.Quiz.findOne({
		where: { id: Number(quizId)},
		include: [{ model: models.Comment}]
	}).then(function(quiz){
		if(quiz){
			req.quiz = quiz;
			next();
		}else{
			next(new Error('No existe quiz Id= ' + quizId));
		}
	}).catch(function(error){
		next(error);
	});
};

// GET /quiz - index

exports.index =function(req,res){
	models.Quiz.findAll().then(function(quizes){
		res.render('quizes/index',{quizes: quizes});			
	})	
};

// GET /quiz/quiz/:id

exports.show =function(req,res){
	res.render('quizes/show',{quiz: req.quiz});				
};

//GET /quiz/:id/answer

exports.answer = function(req,res){
	var resultado = 'Incorrecto';
	if(req.query.respuesta === req.quiz.respuesta){
		resultado = 'Correcto';

		if(req.session.user){
			var userController= require('./user_controller');
			userController.acierto(req, res,function(error){
				if(error){ //si hay error retornamos mensajes de error de sesion
					req.session.errors = [{"message": 'Se ha producido un error: ' + error}];
				return;
				}
			});
		}
	}
	res.render('quizes/answer',{quiz: req.quiz, respuesta: resultado, aciertos: req.cookie.aciertos});
};

//GET /quiz/new

exports.new = function(req,res) {
	var quiz = models.Quiz.build({});
	res.render('quizes/new', {quiz:quiz});
}

//POST /quiz/create

exports.create = function(req,res){
	var quiz=models.Quiz.build(req.body.quiz);
	quiz.validate().then(function(err){
		if(err){
			res.render('quizes/new',{quiz: quiz, errors: err.errors});
		}else{
			quiz.save({fields: ["pregunta","respuesta"]}).then(function(){
				res.redirect('/quizes')});		
		}	
	})
}

//GET /quiz/edit

exports.edit = function(req,res) {
	var quiz = req.quiz;
	res.render('quizes/edit', {quiz: quiz});
}

//PUT /quizes/:id
exports.update = function(req,res){
	req.quiz.pregunta = req.body.quiz.pregunta;
	req.quiz.respuesta = req.body.quiz.respuesta;

	req.quiz.validate().then(
		function(err){
			if(err){
				res.render('quizes/edit', {quiz: req.quiz, errors: err.errors});
			}else{
				req.quiz.save({fields: ["pregunta","respuesta"]})
				.then(function(){res.redirect('/quizes');});			
			}
		}
	)
}

//DELETE /quizes/:id
exports.destroy = function(req, res){
	req.quiz.destroy().then(function(){
		res.redirect('/quizes');
	}).catch(function(error){next(error)});
}