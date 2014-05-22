/*
 * libraries
 */

var CityModel = require('../models/city');


/*
 * class declaration
 */

var City = function() {};


/*
 * routing
 */

var city = new City();

module.exports.route = function(app) {
  app.get('/cities', city.getCities);
  app.get('/city/:id', city.getCity);
};


/*
 * controller
 */

City.prototype.getCities = function(req, res, next) {
  /*
   * model.method(params, success callback, fail callback);
   */
  var city = new CityModel();
  city.cities(req.params, function(result) {
    res.send(result);
  }, function(error) {
    res.send(400, error);
  });

  return next();
};

City.prototype.getCity = function(req, res, next) {
  /*
   * model.method(params, success callback, fail callback);
   */
  var city = new CityModel();
  city.city(req.params, function(result) {
    /*
     * if no result, then 404 Not Found
     */
    if (!result || 0 == Object.getOwnPropertyNames(result).length) {
      res.send(404, {
        result: false,
        code: 404,
        message: 'Not Found'
      });
    } else {
      res.send(result);
    }
  }, function(error) {
    res.send(500, {
      result: false,
      code: 500,
      message: 'Internal server error'
    });
  });

  return next();
};
