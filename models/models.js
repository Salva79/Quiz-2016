var path = require('path');

//Cargar Modelo ORM

var Sequelize = require('sequelize');

//Usar BBDD SQLite:

var sequelize = new Sequelize(null,null,null, {dialect:'sqlite', storage:'quiz.sqlite'});

//Importar la definicion de la tabla quiz en quiz.js:

var Quiz = sequelize.import(path.join(__dirname,'quiz'));

var Comment = sequelize.import(path.join(__dirname, 'comment'));
Comment.belongsTo(Quiz);
Quiz.hasMany(Comment);

var users = sequelize.import(path.join(__dirname,'users'));

exports.Quiz = Quiz; // exportar definición de tabla Quiz
exports.Comment = Comment; 
exports.users = users;

//sequelize.sync() crea e inicializa tabla de preguntas en DB
sequelize.sync().then(function(){
	//sucess(..) ejecuta el manejador una vez creada la tabla
	Quiz.count().then(function(count){
		if(count === 0){		//la tabla se inicializa solo si está vacía.
			Quiz.create({ pregunta: 'Capital de Italia' , respuesta: 'Roma'});
			Quiz.create({ pregunta: 'Capital de Portugal' , respuesta: 'Lisboa'})
			.then(function(){console.log('Base de datos de preguntas inicializa')});

		};
	});
	users.count().then(function(count){
		if(count === 0){		//la tabla se inicializa solo si está vacía.
			users.create({ username: 'admin' , password: '1234'});
			users.create({ username: 'pepe' , password: '5678'})
			.then(function(){console.log('Base de datos de usuarios inicializa')});

		};
	});
});
