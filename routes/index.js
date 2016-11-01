var express = require('express');
var router = express.Router();

var quizController=require('../controllers/quiz_controller');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Quiz-2016' });
});

router.get('/quizes/question', quizController.question);
router.get('/quizes/answer',quizController.answer);
router.get('/quizes/estadistic',quizController.estadistic);
router.get('/quizes/reload',quizController.reload);

module.exports = router;
