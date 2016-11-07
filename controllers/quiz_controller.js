var models=require('../models/models.js');

// AUTOLOAD - FACTORIZA el código si ruta incluye :quizId
exports.load = function(req,res,next,quizId){
	models.Quiz.findById(quizId).then(function(quiz){
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
	}
	res.render('quizes/answer',{quiz: req.quiz, respuesta: resultado});
};


