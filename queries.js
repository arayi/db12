var promise = require('bluebird');

var options = {
  // Initialization Options
  promiseLib: promise
};

var pgp = require('pg-promise')(options);
var connectionString = 'postgres://localhost:5432/dragons';
var db = pgp(connectionString);

function getAllDragons(req, res, next) {
  db.any('select * from wyrms')
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved ALL dragons'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function getSingleDragon(req, res, next) {
  var wyrmID = parseInt(req.params.id);
  db.one('select * from wyrms where id = $1', wyrmID)
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved ONE dragon'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function createDragon(req, res, next) {
  req.body.age = parseInt(req.body.age);
  db.none('insert into wyrms(name, color, age, sex)' +
      'values(${name}, ${color}, ${age}, ${sex})',
    req.body)
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Inserted one dragon'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function updateDragon(req, res, next) {
  req.body.age = parseInt(req.body.age);
  req.body.id = parseInt(req.params.id);
  db.none('update wyrms set name=${name}, color=${color}, age=${age}, sex=${sex} where id=${id}',
    req.body)
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Updated dragon'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function removeDragon(req, res, next) {
  var wyrmID = parseInt(req.params.id);
  db.result('delete from wyrms where id = $1', wyrmID)
    .then(function (result) {
      /* jshint ignore:start */
      res.status(200)
        .json({
          status: 'success',
          message: `Removed ${result.rowCount} wyrms`
        });
      /* jshint ignore:end */
    })
    .catch(function (err) {
      return next(err);
    });
}

module.exports = {
  getAllDragons: getAllDragons,
  getSingleDragon: getSingleDragon,
  createDragon: createDragon,
  updateDragon: updateDragon,
  removeDragon: removeDragon
};