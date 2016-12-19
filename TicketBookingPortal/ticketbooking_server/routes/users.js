const express = require("express");
const router = express.Router();
const User = require("../models/user");

router
    .get("/", (req, res) => {
        User.find((err, users) => {
            if (err) {
                res.send(err);
            }

            res.json(users);
        });
    })
    .post("/", (req, res) => {
        var user = new User();
        user.firstname = req.body.firstName;
        user.lastname = req.body.lastName;
        user.email = req.body.email;
        user.address = req.body.address;
        user.birthdate = req.body.birthDate;

        user.save((err) => {
            if (err) {
                res.send(err);
            }
            res.json({
                message: 'Create user successfully',
                data: user
            });
        });
    });
router
    .get("/:user_id", (req, res) => {
        User.findById(req.params.user_id, (err, user) => {
            if (err) {
                res.send(err);
            }
            res.json(user);
        });
    })
    .delete("/:user_id", (req, res) => {
        User.remove({
            _id: req.params.user_id
        }, (err, user) => {
            if (err) {
                res.send(err);
            }

            res.json({
                messsage: 'Delete user successfully',
                data: user
            });
        });
    })
    .put("/:user_id", (req, res) => {
        User.findById(req.params.user_id, (err, user) => {
            if (err) {
                res.send(err);
            }
            user.firstname = req.body.firstName;
            user.lastname = req.body.lastName;
            user.address = req.body.address;
            user.email = req.body.email;
            user.birthdate = req.body.birthDate;

            user.save((err) => {
            	if(err) {
            		res.send(err);
            	}

            	res.json({
            		message: 'Update user successfully',
            		data: user
            	});
            });
        });
    });

module.exports = router;
