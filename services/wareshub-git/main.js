
var spawn = require('child_process').spawn;
var path = require('path');
var zlib = require('zlib');
var gitBackend = require('git-http-backend');
var basicAuth = require('basic-auth');
var express = require('express');
var log4js = require('log4js');

var configMan = require('config-manager');
var authnzMan = require('authnz-manager');

var config = configMan.get();

LOG_FILENAME = path.join(config.global.datapath,config.global.logdir,'wareshub-auth.log')


// ============================================================================


var authorizeUser = (req, res, next) => {

  let splittedURL = req.url.substr(1).split('/');
  let wareType = splittedURL[0];
  let wareID = splittedURL[1];

  let unauthorized = (res) => {
    res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
    return res.sendStatus(401);
  }

  let credentials = basicAuth(req);

  if (!credentials || !credentials.name) {
    return unauthorized(res);
  }

  if (authnzMan.authenticateUser(credentials.name,credentials.pass)) {
    logMessage = `User ${credentials.name} authenticated`;
    logger.info(logMessage)

    if (authnzMan.authorizeWareAccess(wareType,wareID,credentials.name,true)) {
      logMessage = `User ${credentials.name} granted for ${wareType}/${wareID}`;
      logger.info(logMessage)
      return next();
    } else {
      logMessage = `User ${credentials.name} denied for ${wareType}/${wareID}`;
      logger.warn(logMessage)
      return unauthorized(res);
    }
  } else {
    logMessage = `Wrong username/password for ${credentials.name}`;
    logger.warn(logMessage)
    return unauthorized(res);
  }

}


// ============================================================================


log4js.configure({
  "appenders": [
      {
          "type": "file",
          "filename": LOG_FILENAME,
          "category": "WareshubGitAuthLogger",
          "layout": {
            "type": "pattern",
            "pattern": "[%d{ISO8601}][%p] %m"
        }
      }
  ]
});

var logger = log4js.getLogger('WareshubGitAuthLogger');
logger.setLevel('INFO');


// ============================================================================


var app = express();

app.all('/*', authorizeUser, function(req, res) {

  var splittedURL = req.url.substr(1).split('/');

  var wareType = splittedURL[0];
  var wareID = splittedURL[1];
  var reposPath = path.join(config.global.datapath,config.wareshub.gitserver.reposdir,wareType,wareID);

  var reqStream = req.headers['content-encoding'] == 'gzip' ? req.pipe(zlib.createGunzip()) : req;

  reqStream.pipe(gitBackend(req.url, function (err, service) {
    if (err) {
      return res.end(err + '\n');
    }

    res.setHeader('content-type', service.type);

    var ps = spawn(service.cmd, service.args.concat(reposPath));
    ps.stdout.pipe(service.createStream()).pipe(ps.stdin);

  })).pipe(res);

});

app.listen(config.wareshub.gitserver.port)
