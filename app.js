var restify = require('restify');
var fs = require('fs');
var logger = require('./lib/logger');

var server = restify.createServer({
  log: logger,
  name: 'node restify mvc'
});

server.use(restify.acceptParser(server.acceptable));
server.use(restify.authorizationParser());
server.use(restify.dateParser());
server.use(restify.queryParser());
server.use(restify.bodyParser());
server.use(restify.gzipResponse());
server.use(restify.throttle({
  burst: 100,
  rate: 50,
  ip: true, // throttle based on source ip address
  overrides: {
    '127.0.0.1': {
      rate: 0, // unlimited
      burst: 0
    }
  }
}));
server.on('after', restify.auditLogger({
  log: logger
}));

// this one will be explained in the next section
server.use(function slowPoke(req, res, next) {
  setTimeout(next.bind(this), parseInt((process.env.SLEEP_TIME || 0), 10));
});

// load route
require('./route.js')(__dirname+'/controllers', server);

// start server
server.listen(8080, function startServer() {
  logger.info('%s listening at %s', server.name, server.url);
});
