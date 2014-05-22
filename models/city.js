/**
 * city model
 */

var util = require('util');
var Model = require('./base');

var CityModel = function() {};
util.inherits(CityModel, Model);

CityModel.prototype.cities = function(params, success, fail) {
  var self = this;

  self.init([], success, fail);

  var db = self.db();
  var logger = self.logger();

  var sql = db.prepare('SELECT * FROM cities');

  db.query(sql())
    .on('result', function(res) {
      logger.debug({ query: res['_parent']['_query'] }, 'Results');

      res.on('row', function onRow(row) {
        logger.debug({ 'row': row });

        self.addResult(row);
      })
      .on('error', self.queryError.bind(self))
      .on('end', self.queryEnd.bind(self));
    })
    .on('error', self.resultError.bind(self))
    .on('end', self.resultEnd.bind(self));

  db.end();
};

CityModel.prototype.city = function(params, success, fail) {
  var self = this;

  self.init({}, success, fail);

  var db = self.db();
  var logger = self.logger();

  var sql = db.prepare('SELECT * FROM cities WHERE id = :id');

  db.query(sql({ id: params.id }))
    .on('result', function(res) {
      logger.debug({ query: res['_parent']['_query'] }, 'Results');

      res.on('row', function onRow(row) {
        logger.debug({ 'row': row });

        self.setResult(row);
      })
      .on('error', self.queryError.bind(self))
      .on('end', self.queryEnd.bind(self));
    })
    .on('error', self.resultError.bind(self))
    .on('end', self.resultEnd.bind(self));

  db.end();
};

module.exports = CityModel;
