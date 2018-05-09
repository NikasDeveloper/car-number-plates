const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const CarNumberPlate = require('../models/CarNumberPlate');
const badRequestErrorFactory = require('../factories/badRequestErrorFactory');
const numberTakenErrorFactory = require('../factories/numberTakenErrorFactory');
const transformNumberPlate = cnp => ({
  _id: cnp._id,
  number: cnp.number,
  owner: cnp.owner
});
const notFoundError = { code: 404, message: 'Car number plate not found' };

router.get('/', ( req, res ) => {
  CarNumberPlate.find()
    .select("_id number owner")
    .exec()
    .then(carNumberPlates => {
      res.status(200).json({
        carNumberPlates: carNumberPlates.map(cnp => transformNumberPlate(cnp))
      });
    })
    .catch(() => {
      res.status(500).json({ code: 500, message: "Failed to load car number plates." });
    });
});

router.post('/', ( req, res ) => {
  const carNumberPlate = new CarNumberPlate({
    _id: new mongoose.Types.ObjectId(),
    number: req.body.number,
    owner: {
      firstName: req.body.owner.firstName,
      lastName: req.body.owner.lastName
    }
  });
  carNumberPlate
    .save()
    .then(cnp => res.status(201).json({
      carNumberPlate: {
        message: 'Car number plate created successfully',
        carPlateNumber: {
          _id: cnp._id,
          number: cnp.number,
          owner: cnp.owner
        }
      }
    }))
    .catch(e => e.code === 11000
      ? res.status(422).json(numberTakenErrorFactory())
      : res.status(422).json(badRequestErrorFactory(e.errors))
    );
});

router.get('/:carNumberPlateId', ( req, res ) => {
  const id = req.params.carNumberPlateId;
  CarNumberPlate.findById(id)
    .select('_id number owner')
    .exec()
    .then(cpn => {
      if ( !cpn ) res.status(404).json(notFoundError);
      res.status(200).json({ carNumberPlate: transformNumberPlate(cpn) });
    })
    .catch(() => res.status(404).json(notFoundError));
});

router.put("/:carNumberPlateId", ( req, res ) => {
  const id = req.params.carNumberPlateId;
  const updatedAttributes = {
    number: req.body.number,
    owner: {
      firstName: req.body.owner.firstName,
      lastName: req.body.owner.lastName
    }
  };
  CarNumberPlate.update({ _id: id }, { $set: updatedAttributes }, { runValidators: true })
    .exec()
    .then(() => res.status(200).json({ message: 'Car number plate updated', }))
    .catch(e => e.code === 11000
      ? res.status(422).json(numberTakenErrorFactory())
      : res.status(422).json(badRequestErrorFactory(e.errors))
    );
});

router.delete('/:carNumberPlateId', ( req, res ) => {
  const id = req.params.carNumberPlateId;
  CarNumberPlate.remove({ _id: id })
    .exec()
    .then(result => result.n
      ? res.status(200).json({ message: 'Car number plate deleted', })
      : res.status(404).json(notFoundError)
    )
    .catch(() => res.status(500).json({
      code: 500,
      message: 'Failed to delete car number plate'
    }));
});

module.exports = router;