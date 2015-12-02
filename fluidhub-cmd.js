#!/usr/bin/env node

/*

  This file is part of OpenFLUID software
  Copyright(c) 2007, INRA - Montpellier SupAgro

  OpenFLUID-FluidHub-services is free software: you can redistribute it and/or modify
  it under the terms of the GNU Affero General Public License as
  published by the Free Software Foundation, either version 3 of the
  License, or (at your option) any later version.

  This program is distributed in the hope that it will be useful,
  but WITHOUT ANY WARRANTY; without even the implied warranty of
  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
  GNU Affero General Public License for more details.

  You should have received a copy of the GNU Affero General Public License
  along with this program. If not, see <http://www.gnu.org/licenses/>.

  == Other Usage ==

   Other Usage means a use of OpenFLUID-FluidHub-services that is
   inconsistent with the AGPL license, and requires a written agreement
   between You and INRA. Licensees for Other Usage of OpenFLUID-FluidHub-services
   may use this file in accordance with the terms contained in the written agreement
   between You and INRA.

*/


var configMan = require('./lib/config-manager');
var pm2 = require('pm2');


// ============================================================================

function getServiceName(service,name) {
  return 'fluidhub:'+name+'['+service+']';
}


// ============================================================================


function startSingleService(service,name,rootdir,script) {

  // TODO test if running
  console.log('Launching \''+service+'\' service for \''+name+'\' hub ('+getServiceName(service,name)+')');
  pm2.start({
    script : script,
    name : getServiceName(service,name),
    args : [rootdir]
  }, function(err, apps) {
    pm2.disconnect();
  });
}


// ============================================================================


function startServices(name,rootdir) {

  config = configMan.get(rootdir);

  pm2.connect(function() {

    startSingleService('api',name,rootdir,'lib/api-service.js')

    if (config['wareshub'].enabled) {
      startSingleService('wareshubgit',name,rootdir,'lib/wareshub-gitserver.js')
    }

    if (config['webui'].enabled) {
      startSingleService('webui',name,rootdir,'lib/webui-service.js')
    }

    // TODO to enable when developed
    /*if (config['simhub'].enabled) {
      startSingleService('simhubgit',name,rootdir,'lib/simhub-gitserver.js')
    }*/

  });
}


// ============================================================================


function stopSingleService(service,name) {

  // TODO test if running
  console.log('Stopping and removing \''+service+'\' service for \''+name+'\' hub ('+getServiceName(service,name)+')');
  pm2.delete(getServiceName(service,name), function(err, apps) {
    pm2.disconnect();
  });
}


// ============================================================================


function stopServices(name) {

  pm2.connect(function() {

    stopSingleService('api',name)
    stopSingleService('wareshubgit',name)
    stopSingleService('webui',name)
    // TODO to enable when developed
    //stopSingleService('simhubgit',name)
  });
}


// ============================================================================


function showConfig(rootdir) {
  config = configMan.get(rootdir);
  console.log(config);
}


// ============================================================================


var argParser = require('commander')

argParser
  .command('start')
  .description('start FluidHub services')
  .arguments('<name>','name of the services instance')
  .option('--rootdir <dir>','specify root directory for data of the instance')
  .action(function(name,options) {
    if (!options.rootdir)
      console.log("rootdir is not defined");
    else
      startServices(name,options.rootdir);
  });

argParser
  .command('stop')
  .description('stop FluidHub services')
  .arguments('<name>','name of the services instance')
  .action(function(name) {
    stopServices(name);
  });

argParser
  .command('show-config')
  .description('show FluidHub services configuration')
  .option('--rootdir <dir>','specify root directory for data of the instance')
  .action(function(options) {
    if (!options.rootdir)
      console.log("rootdir is not defined");
    else
      showConfig(options.rootdir);
  });

argParser.parse(process.argv);
