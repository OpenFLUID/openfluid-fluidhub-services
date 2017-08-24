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


exports.authenticateUser = function(User,Password) {
/*  $ldap = @ldap_connect("ldap.supagro.inra.fr",389);
  @ldap_set_option($ldap, LDAP_OPT_PROTOCOL_VERSION, 3) ;

  if ($bind = @ldap_bind($ldap,
                         "uid=".$username.",ou=LISAH,ou=Services,ou=Users,dc=ensam,dc=inra,dc=fr",
                         $password))
*/
  let isAuth = false;

  var options = {
      uri: 'ldap://ldap.supagro.inra.fr', // string
      version: 3, // integer, default is 3,
      starttls: false, // boolean, default is false
      connecttimeout: -1, // seconds, default is -1 (infinite timeout), connect timeout
      timeout: 5000, // milliseconds, default is 5000 (infinite timeout is unsupported), operation timeout
      reconnect: true, // boolean, default is true,
      backoffmax: 32 // seconds, default is 32, reconnect timeout
  };


//  var Promise = require('bluebird');
  var LDAP =  require('ldap-client');

  //ldap = Promise.promisifyAll(new LDAP(options));
  ldap = new LDAP(options);

  bindOptions = {binddn : 'uid='+User+',ou=LISAH,ou=Services,ou=Users,dc=ensam,dc=inra,dc=fr', password: Password };
//  console.log(bindOptions);

  ldap.bind(bindOptions,
            function(err) {
    if (err) {
      console.log('error!')
    }
    else {
      console.log('authenticated!')
      isAuth = true;
    }
  });
  /*ldap.bindAsync(bindOptions).then(function() {
    isAuth = true;
    console.log("yes!")
  }).catch(function(err) {
    console.log("no!")
  });*/

  console.log(isAuth)
  /*

  return true;*/
  return isAuth;
}


// ============================================================================


exports.authorizeWareAccess = function(WareType,WareID,User,AccessMode) {
  return true;
}
