var bunyan = require('bunyan');

var level = 'debug';
if ('production' == process.env.NODE_ENV) {
  level = 'error';
}

var logger = bunyan.createLogger({
  name: 'logger',
  streams: [
    {
      level: process.env.LOG_LEVEL || level,
      stream: process.stdout,
    }
  ],
  serializers: bunyan.stdSerializers
});

module.exports = logger;
