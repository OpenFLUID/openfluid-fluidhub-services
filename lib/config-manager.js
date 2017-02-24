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


var objM = require('object-merge');


// ============================================================================


exports.get = function() {
  var config = require('config.json');

  try {
    localConfig = require('localconfig.json');

    config = objM(config,localConfig);
  }
  catch(err) { }

  return config;
}


// ============================================================================


exports.isEnabled = function(config,service) {
  return config[service].enabled;
}


// ============================================================================


exports.getFluidHubSignature = function(config) {

  let capabilities = [];

  if (config.wareshub.enabled)
    capabilities.push('wares');

  return {
    "nature": "OpenFLUID FluidHub",
    "name": config.global.name,
    "api-version": "0.7-20151124",
    "capabilities": capabilities,
    "status": config.global.status
  }
}
