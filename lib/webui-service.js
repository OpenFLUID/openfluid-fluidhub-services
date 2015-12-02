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


var rootDir = process.argv[2]

var configMan = require('./config-manager');
var constants = require('./constants');
var express = require('express');

var config = configMan.get(rootDir)
var app = express();

app.set('view engine', 'ejs');
app.set('views', __dirname + '/webui/views');


// ============================================================================


app.get('/', function(req, res) {
    res.render('not.ejs',{path: req.path})
});


// ============================================================================


if (config['wareshub'].enabled) {

  app.get('/wares', function(req, res) {
    res.redirect('/wares/'+constants.waresTypes[0])
  });

  for (var wtype in constants.waresTypes) {

    app.get('/wares/'+constants.waresTypes[wtype], function(req, res) {
      res.render('not.ejs',{path: req.path})
    });

    app.get('/wares/'+constants.waresTypes[wtype]+'/:id', function(req, res) {
      res.render('not.ejs',{path: req.path})
    });

    app.get('/wares/'+constants.waresTypes[wtype]+'/:id/:branch', function(req, res) {
      res.redirect('/wares/'+waresTypes[wtype]+'/'+req.params.id+'/'+req.params.branch+'/infos')
    });

    app.get('/wares/'+constants.waresTypes[wtype]+'/:id/:branch/infos', function(req, res) {
      res.render('not.ejs',{path: req.path})
    });

    app.get('/wares/'+constants.waresTypes[wtype]+'/:id/:branch/commits', function(req, res) {
      res.render('not.ejs',{path: req.path})
    });

    app.get('/wares/'+constants.waresTypes[wtype]+'/:id/:branch/issues', function(req, res) {
      res.render('not.ejs',{path: req.path})
    });

  }
}


// ============================================================================


app.listen(config.webui.port);
