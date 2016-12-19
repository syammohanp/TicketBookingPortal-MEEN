const express = require("express");
const router = express.Router();
const Seat = require("../models/seat");
const mongoose = require("mongoose");

//Get all seats
router.get("/", (req, res) => {
    Seat.find((err, seats) => {
        if (err) {
            res.send(err);
        }

        res.json(seats);
    });
});

//Create new seats by number of rol and number of col
router.post("/", (req, res) => {
    //Run only once for seat board
    var numberOfRow = req.body.numberOfRow;
    var numberOfCol = req.body.numberOfCol;
    var seatId = 0;
    var creationResult = [];
    for (var i = 0; i < numberOfRow; i++) {
        for (var j = 0; j < numberOfCol; j++) {
            seatId++;
            var seat = new Seat();
            seat.name = seatId;
            seat.isbooked = false;
            seat.col = j;
            seat.row = i;
            seat.bookedby = null;
            console.log(seat);
            seat.save((err) => {
                if (err) {
                    console.log(err);

                } else {
                    console.log(creationResult[seatId - 1]);
                    console.log(`item [${i}][${j}] created successfully...`);
                }
            });
        }
    }

    res.json({ message: "Create successfully", inserted: creationResult });
});

//Update seat details by seat_id
// router.put("/:seat_id", (req, res) => {
//     Seat.findById(req.params.seat_id, (err, seat) => {
//         if (err) {
//             res.send(err);
//         }

//         seat.isbooked = req.body.isbooked;
//         seat.bookedby = req.body.bookedby;

//         seat.save((err) => {
//             if (err) {
//                 res.send(err);
//             }
//             res.json({
//                 message: 'Update successfully',
//                 data: seat
//             });
//         });

//     });
// });

router.put("/submit", (req, res) => {
    var seatids = req.body.seatids,
        userid = mongoose.Types.ObjectId(req.body.userid);

    Seat.find({ _id: { $in: seatids } }, (err, seats) => {
        if (err) {
            res.send(err);
        }
        seats.forEach((item) => {
            item.isbooked = true;
            item.bookedby = userid;
            item.save((err) => {
                if (err) {
                    res.send(err);
                }
            });
        });

        res.json({
            message: 'Submit booked seats successfully',
            data: seats
        });
    });
});

//Get seat details by seat_id
router.get("/:seat_id", (req, res) => {
    Seat.findById(req.params.seat_id, (err, seat) => {
        if (err) {
            res.send(err);
        }

        res.json(seat);
    });
});

module.exports = router;
