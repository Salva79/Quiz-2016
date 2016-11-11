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
	res.render('quizes/show',{quiz: req.quiz, fallos: req.query.fallos});				
};

//GET /quiz/:id/answer
exports.answer = function(req,res){
	var almacen = ++req.query.fallos;
	var resultado = 'Incorrecto';
	if(req.query.respuesta === req.quiz.respuesta){
		resultado = 'Correcto';
		almacen=0;
	}	
	res.render('quizes/answer',{quiz: req.quiz, respuesta: resultado, suma: almacen});
};

//GET /quiz/new
exports.new = function(req,res) {
	var quiz = models.Quiz.build({
		pregunta: 'Pregunta',
		respuesta: 'Respuesta'
	});
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
