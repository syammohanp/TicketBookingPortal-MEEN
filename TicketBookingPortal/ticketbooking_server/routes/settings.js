const express = require('express');
const router = express.Router();
const Setting = require('../models/setting');

router
    // .get('/createrandomdata', (req, res) => {
    //     var setting = new Setting({
    //         mailling: true,
    //         sms: false
    //     });
    //     setting.save((err) => {
    //         if (err) {
    //             res.send(err);
    //         }

    //         res.json({
    //             success: true,
    //             message: 'Seed successfully'
    //         });
    //     });
    // })
    .get('/', (req, res) => {
        Setting.find((err, settings) => {
            if (err) {
                res.send(err);
            }

            res.json(settings);
        });
    });

module.exports = router;
