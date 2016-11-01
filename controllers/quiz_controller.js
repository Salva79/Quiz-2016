var models=require('../models/models.js');

// GET /quiz/question

exports.question =function(req,res){
	models.Quiz.findAll().then(function(quiz){
		res.render('quizes/question',{pregunta: quiz[0].pregunta});
	})	
};

//GET /quiz/answer

exports.answer = function(req,res){
	models.Quiz.findAll().then(function(quiz){
	if(req.query.respuesta === quiz[0].respuesta){
		quiz[0].acierto++;
		quiz[0].save({fields: ['acierto']}).then(function() { console.log('Fallo al actualizar aciertos')});
		res.render('quizes/answer',{respuesta: 'Correcto'});
	}else{
		quiz[0].fallo++
		quiz[0].save({fields: ['fallo']}).then(function() { console.log('Fallo al actualizar fallos')});
		res.render('quizes/fault',{respuesta: 'Incorrecto', aciertos: quiz[0].acierto});
	}

	})
};

//GET /quiz/estadistic

exports.estadistic =function(req,res){
	models.Quiz.findAll().then(function(quiz){
		res.render('quizes/estadistic',{fallos: quiz[0].fallo, aciertos: quiz[0].acierto});
	})	
};

//GET /quiz/reload

exports.reload =function(req,res){
	models.Quiz.findAll().then(function(quiz){
		quiz[0].fallo = 0;
		quiz[0].acierto = 0;
		quiz[0].save({fields: ['fallo' , 'acierto']}).then(function() { console.log('Fallo al reiniciar fallos y aciertos')});
		res.render('quizes/reload',{fallos: quiz[0].fallo, aciertos: quiz[0].acierto});
	})	
};
