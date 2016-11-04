var models=require('../models/models.js');

// GET /quiz/quiz/:id

exports.show =function(req,res){
	models.Quiz.findById(req.params.quizId).then(function(quiz){
		res.render('quizes/show',{quiz: quiz});			
	})	
};

//GET /quiz/:id/answer

exports.answer = function(req,res){
	models.Quiz.findById(req.params.quizId).then(function(quiz){
		if(req.query.respuesta === quiz.respuesta){
			res.render('quizes/answer',{quiz: quiz, respuesta: 'Correcto'});
		}else{
			res.render('quizes/answer',{quiz: quiz, respuesta: 'Incorrecto'});
		}
	})
};


// GET /quiz/index

exports.index =function(req,res){
	models.Quiz.findAll().then(function(quizes){
		res.render('quizes/index',{quizes: quizes});			
	})	
};