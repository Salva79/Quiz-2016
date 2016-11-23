var express = require('express');
var router = express.Router();
var quizController=require('../controllers/quiz_controller');
var commentController=require('../controllers/comment_controller');
var sessionController=require('../controllers/session_controller'); 

/* GET home page. */
router.get('/', function(req, res, next) {res.render('index', { title: 'Quiz-2016', errors: []});});
//Autoload de comandos con quizid
router.param('quizId', quizController.load);

//Definición de rutas de sesion
router.get('/login',sessionController.new); //formulario login
router.post('/login',sessionController.create); //crear sesion
router.get('/logout',sessionController.destroy); //destruir sesion


/* GET de quizes */
router.get('/quizes', quizController.index);
router.get('/quizes/:quizId(\\d+)', quizController.show);
router.get('/quizes/:quizId(\\d+)/answer',quizController.answer);

router.get('/quizes/new', 					sessionController.loginRequiered, quizController.new);
router.post('/quizes/create', 				sessionController.loginRequiered, quizController.create);
router.get('/quizes/:quizId(\\d+)/edit', 	sessionController.loginRequiered, quizController.edit);
router.put('/quizes/:quizId(\\d+)', 		sessionController.loginRequiered, quizController.update);
router.delete('/quizes/:quizId(\\d+)', 		sessionController.loginRequiered, quizController.destroy);

router.get('/quizes/:quizId(\\d+)/comments/new', commentController.new);
router.post('/quizes/:quizId(\\d+)/comments', commentController.create);


module.exports = router;
