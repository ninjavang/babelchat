var router = require('express').Router();
var UserModel = require('../models/user');

//USER API ROUTES

//GET services
router.get('/', (req, res) => {
	UserModel.find(function(err, users) {
  		if (err) console.log(err);

  		res.json(users);
        console.log(users);
  	});
});

//GET users/id
router.get('/:id', (req, res) => {
	UserModel.findById(req.params.id, function(err, users) {
        if (err) res.send(err);

        res.header("Access-Control-Allow-Origin", "*");
        res.json(users);
    });
});

//POST users
router.post('/', (req, res) => {
    console.log("post user called");
	var user_to_save = UserModel(req.body);  
	user_to_save.save(function(err){
		if (err) console.log(err);

		res.send("user posted.")
	});
});

//PUT users/id
router.put('../users/:id', (req, res) => {
	UserModel.findById(req.params.id, function(err, users) {
           
        if (err) res.send(err);

        users.email = req.body.email; 
        user.password = req.body.password;

        users.save(function(err) {
            if (err) console.log(err);

            res.send("user updated.");
        });
    });
});

//DELETE users/id
router.delete('../users/:id', (req, res) => {
	UserModel.remove({id: req.params.id}, function(err, users) {
        if (err) console.log(err);

        res.send("user deleted.");       
	});
});

module.exports = router;