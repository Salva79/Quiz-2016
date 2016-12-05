var express = require('express');
var router = express.Router();
var quizController=require('../controllers/quiz_controller');
var commentController=require('../controllers/comment_controller');
var sessionController=require('../controllers/session_controller'); 
var userController=require('../controllers/user_controller');

/* GET home page. */
router.get('/', function(req, res, next) {res.render('index', { title: 'Quiz-2016', errors: []});});

//Autoload de comandos con quizid
router.param('quizId', quizController.load);
router.param('commentId',commentController.load);
router.param('userId', userController.load);

//Definición de rutas de sesion
router.get('/login',sessionController.new); //formulario login
router.post('/login',sessionController.create); //crear sesion
router.get('/logout',sessionController.destroy); //destruir sesion


/* GET de quizes */
router.get('/quizes', quizController.index);
router.get('/quizes/:quizId(\\d+)', quizController.show);
router.get('/quizes/:quizId(\\d+)/answer', quizController.answer);

router.get('/quizes/new', 					sessionController.loginRequiered, quizController.new);
router.post('/quizes/create', 				sessionController.loginRequiered, quizController.create);
router.get('/quizes/:quizId(\\d+)/edit', 	sessionController.loginRequiered, quizController.edit);
router.put('/quizes/:quizId(\\d+)', 		sessionController.loginRequiered, quizController.update);
router.delete('/quizes/:quizId(\\d+)', 		sessionController.adminRequiered, quizController.destroy);

//Definicion de rutas de comentarios
router.get('/quizes/:quizId(\\d+)/comments/new', commentController.new);
router.post('/quizes/:quizId(\\d+)/comments', commentController.create);
router.get('/quizes/:quizId(\\d+)/comments/:commentId(\\d+)/publish', sessionController.loginRequiered, commentController.publish);

//Nuevos usuarios
router.get('/user', userController.index);
router.get('/user/new', userController.new);
router.post('/user/create', userController.create);
router.get('/user/:userId(\\d+)/edit', 	sessionController.useradminRequiered, userController.edit);
router.put('/user/:userId(\\d+)', 		sessionController.useradminRequiered, userController.update);
router.delete('/user/:userId(\\d+)', 	sessionController.useradminRequiered, userController.destroy);


module.exports = router;
